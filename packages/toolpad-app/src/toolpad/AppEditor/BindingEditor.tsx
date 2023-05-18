import * as React from 'react';
import {
  Box,
  Checkbox,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  TooltipProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  TextField,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {
  LiveBinding,
  JsExpressionAttrValue,
  JsExpressionAction,
  ScopeMeta,
  ScopeMetaField,
  JsRuntime,
  PropValueType,
  BindableAttrValue,
  NavigationAction,
  NodeId,
  EnvAttrValue,
} from '@mui/toolpad-core';
import { createProvidedContext } from '@mui/toolpad-utils/react';
import { TabContext, TabList } from '@mui/lab';
import { mapValues } from '@mui/toolpad-utils/collections';
import { JsExpressionEditor } from './PageEditor/JsExpressionEditor';
import JsonView from '../../components/JsonView';
import useLatest from '../../utils/useLatest';
import useDebounced from '../../utils/useDebounced';
import { useEvaluateLiveBinding } from './useEvaluateLiveBinding';
import GlobalScopeExplorer from './GlobalScopeExplorer';
import { WithControlledProp, Maybe } from '../../utils/types';

import { tryFormatExpression } from '../../utils/prettier';
import useShortcut from '../../utils/useShortcut';
import useUnsavedChangesConfirm from '../hooks/useUnsavedChangesConfirm';

import TabPanel from '../../components/TabPanel';

import { useDom } from '../AppState';
import * as appDom from '../../appDom';
// eslint-disable-next-line import/no-cycle
import BindableEditor from './PageEditor/BindableEditor';

interface BindingEditorContext {
  label: string;
  globalScope: Record<string, unknown>;
  globalScopeMeta: ScopeMeta;
  /**
   * Serverside binding, use the QuickJs runtime to evaluate bindings
   */
  jsRuntime: JsRuntime;
  disabled?: boolean;
  propType?: PropValueType;
  liveBinding?: LiveBinding;
  envVarNames?: string[];
}

const [useBindingEditorContext, BindingEditorContextProvider] =
  createProvidedContext<BindingEditorContext>('BindingEditor');

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.dark,
  },
}));

interface JsExpressionBindingEditorProps extends WithControlledProp<JsExpressionAttrValue | null> {
  globalScope: Record<string, unknown>;
  globalScopeMeta: ScopeMeta;
}

function JsExpressionBindingEditor({
  globalScope,
  globalScopeMeta,
  value,
  onChange,
}: JsExpressionBindingEditorProps) {
  const handleChange = React.useCallback(
    (newValue: string) => onChange({ type: 'jsExpression', value: newValue }),
    [onChange],
  );

  return (
    <JsExpressionEditor
      globalScope={globalScope}
      globalScopeMeta={globalScopeMeta}
      value={value?.type === 'jsExpression' ? value.value : ''}
      onChange={handleChange}
      autoFocus
    />
  );
}

interface JsExpressionPreviewProps {
  jsRuntime: JsRuntime;
  input: BindableAttrValue<any> | null;
  globalScope: Record<string, unknown>;
}

function JsExpressionPreview({ jsRuntime, input, globalScope }: JsExpressionPreviewProps) {
  const previewValue: LiveBinding = useEvaluateLiveBinding({ jsRuntime, input, globalScope });

  const lastGoodPreview = useLatest(previewValue?.error ? undefined : previewValue);
  const previewErrorDebounced = useDebounced(previewValue?.error, 500);
  const previewError = previewValue?.error && previewErrorDebounced;

  return (
    <React.Fragment>
      <Toolbar disableGutters>
        <Typography color="error">{previewError?.message}</Typography>
      </Toolbar>
      <JsonView sx={{ flex: 1 }} src={lastGoodPreview?.value} />
    </React.Fragment>
  );
}

export interface EnvBindingEditorProps extends WithControlledProp<EnvAttrValue | null> {}

export function EnvBindingEditor({ value, onChange }: EnvBindingEditorProps) {
  const { envVarNames = [] } = useBindingEditorContext();

  const hasEnvVars = envVarNames.length > 0;

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: string | null) => {
      onChange({
        type: 'env',
        value: newValue || '',
      });
    },
    [onChange],
  );

  const helperText = React.useMemo(() => {
    if (!hasEnvVars) {
      return 'No environment variables available';
    }

    return null;
  }, [hasEnvVars]);

  return (
    <Box sx={{ my: 1 }}>
      <Typography>Assign to an environment variable</Typography>
      <Autocomplete
        options={envVarNames}
        value={value?.value || ''}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{ my: 3 }}
            label="Select environment variable"
            disabled={!hasEnvVars}
            helperText={helperText}
          />
        )}
      />
    </Box>
  );
}

function getValueBindingTab(value: Maybe<BindableAttrValue<any>>) {
  return value?.type || 'jsExpression';
}

export interface ValueBindingEditorProps
  extends WithControlledProp<JsExpressionAttrValue | EnvAttrValue | null> {}

export function ValueBindingEditor({ value, onChange }: ValueBindingEditorProps) {
  const {
    label,
    globalScope,
    globalScopeMeta = {},
    jsRuntime,
    propType,
    envVarNames,
  } = useBindingEditorContext();

  const hasEnv = Boolean(envVarNames);

  const [activeTab, setActiveTab] = React.useState<BindableType>(getValueBindingTab(value));
  React.useEffect(() => {
    setActiveTab(getValueBindingTab(value));
  }, [value]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: BindableType) => {
    setActiveTab(newValue);
  };

  const jsExpressionBindingEditor = (
    <Stack direction="row" sx={{ height: 400, gap: 2, my: hasEnv ? 3 : 0 }}>
      <GlobalScopeExplorer sx={{ width: 250 }} value={globalScope} meta={globalScopeMeta} />

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Typography sx={{ mb: 2 }}>
          Make the &quot;{label}&quot; property dynamic with a JavaScript expression. This property
          expects a type: <code>{propType?.type || 'any'}</code>.
        </Typography>

        <JsExpressionBindingEditor
          globalScope={globalScope}
          globalScopeMeta={globalScopeMeta}
          value={value?.type === 'jsExpression' ? value : null}
          onChange={onChange}
        />

        <JsExpressionPreview jsRuntime={jsRuntime} input={value} globalScope={globalScope} />
      </Box>
    </Stack>
  );

  return hasEnv ? (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleTabChange} aria-label="Choose action kind ">
          <Tab label="JS expression" value="jsExpression" />
          <Tab label="Environment variable" value="env" />
        </TabList>
      </Box>
      <TabPanel value="jsExpression" disableGutters>
        <Box sx={{ my: 1 }}>
          <Typography>Bind to a JavaScript expression.</Typography>
          {jsExpressionBindingEditor}
        </Box>
      </TabPanel>
      <TabPanel value="env" disableGutters>
        <EnvBindingEditor value={value?.type === 'env' ? value : null} onChange={onChange} />
      </TabPanel>
    </TabContext>
  ) : (
    jsExpressionBindingEditor
  );
}

export interface JsExpressionActionEditorProps
  extends WithControlledProp<JsExpressionAction | null> {}

function JsExpressionActionEditor({ value, onChange }: JsExpressionActionEditorProps) {
  const { globalScope, globalScopeMeta } = useBindingEditorContext();
  const handleCodeChange = React.useCallback(
    (newValue: string) => onChange({ type: 'jsExpressionAction', value: newValue }),
    [onChange],
  );

  return (
    <Box sx={{ my: 1 }}>
      <Typography>Run code when this event fires</Typography>
      <Box
        sx={{
          my: 3,
          display: 'flex',
          flexDirection: 'row',
          maxHeight: 250,
          alignItems: 'stretch',
          gap: 2,
        }}
      >
        <GlobalScopeExplorer sx={{ width: 250 }} value={globalScope} meta={globalScopeMeta} />

        <JsExpressionEditor
          sx={{ flex: 1 }}
          globalScope={globalScope}
          globalScopeMeta={globalScopeMeta}
          value={value?.value || ''}
          onChange={handleCodeChange}
          functionBody
          topLevelAwait
        />
      </Box>
    </Box>
  );
}

export interface NavigationActionParameterEditorProps
  extends WithControlledProp<BindableAttrValue<string> | null> {
  label: string;
}

function NavigationActionParameterEditor({
  label,
  value,
  onChange,
}: NavigationActionParameterEditorProps) {
  const { jsRuntime, globalScope, globalScopeMeta } = useBindingEditorContext();

  const liveBinding = useEvaluateLiveBinding({
    jsRuntime,
    input: value,
    globalScope,
  });

  return (
    <Box>
      <BindableEditor<string>
        liveBinding={liveBinding}
        jsRuntime={jsRuntime}
        globalScope={globalScope}
        globalScopeMeta={globalScopeMeta}
        label={label}
        propType={{ type: 'string' }}
        value={value || null}
        onChange={onChange}
      />
    </Box>
  );
}

export interface NavigationActionEditorProps extends WithControlledProp<NavigationAction | null> {}

function NavigationActionEditor({ value, onChange }: NavigationActionEditorProps) {
  const { dom } = useDom();
  const root = appDom.getApp(dom);
  const { pages = [] } = appDom.getChildNodes(dom, root);

  const getDefaultActionParameters = React.useCallback((page: appDom.PageNode) => {
    const defaultPageParameters = page.attributes.parameters?.value || [];

    return mapValues(Object.fromEntries(defaultPageParameters), (pageParameterValue) =>
      appDom.createConst(pageParameterValue),
    );
  }, []);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const pageId = event.target.value as NodeId;
      const page = appDom.getNode(dom, pageId);

      const defaultActionParameters = appDom.isPage(page) ? getDefaultActionParameters(page) : {};

      onChange({
        type: 'navigationAction',
        value: {
          page: appDom.ref(pageId),
          parameters: defaultActionParameters,
        },
      });
    },
    [dom, getDefaultActionParameters, onChange],
  );

  const actionPageRef = value?.value?.page || null;
  const actionParameters = React.useMemo(
    () => value?.value.parameters || {},
    [value?.value.parameters],
  );

  const actionPageId = actionPageRef ? appDom.deref(actionPageRef) : null;
  const actionPage = pages.find((availablePage) => availablePage.id === actionPageId);

  const handleActionParameterChange = React.useCallback(
    (actionParameterName: string) => (newValue: BindableAttrValue<string> | null) => {
      if (actionPageRef) {
        onChange({
          type: 'navigationAction',
          value: {
            page: actionPageRef,
            parameters: {
              ...actionParameters,
              ...(newValue ? { [actionParameterName]: newValue } : {}),
            },
          },
        });
      }
    },
    [actionPageRef, actionParameters, onChange],
  );

  const hasPagesAvailable = pages.length > 0;

  const defaultActionParameters = actionPage ? getDefaultActionParameters(actionPage) : {};

  const actionParameterEntries = Object.entries(actionParameters || defaultActionParameters);

  return (
    <Box sx={{ my: 1 }}>
      <Typography>Navigate to a page on this event</Typography>
      <TextField
        fullWidth
        sx={{ my: 3 }}
        label="Select a page"
        select
        value={actionPageId || ''}
        onChange={handlePageChange}
        disabled={!hasPagesAvailable}
        helperText={hasPagesAvailable ? null : 'No other pages available'}
      >
        {pages.map((page) => (
          <MenuItem key={page.id} value={page.id}>
            {page.name}
          </MenuItem>
        ))}
      </TextField>
      {actionParameterEntries.length > 0 ? (
        <React.Fragment>
          <Typography variant="overline">Page parameters:</Typography>
          {Object.entries(actionParameters || defaultActionParameters).map((actionParameter) => {
            const [actionParameterName, actionParameterValue] = actionParameter;

            return (
              <NavigationActionParameterEditor
                key={actionParameterName}
                label={actionParameterName}
                value={actionParameterValue as BindableAttrValue<string>}
                onChange={handleActionParameterChange(actionParameterName)}
              />
            );
          })}
        </React.Fragment>
      ) : null}
    </Box>
  );
}

type BindableType = BindableAttrValue<any>['type'];

function getActionTab(value: Maybe<BindableAttrValue<any>>) {
  return value?.type || 'jsExpressionAction';
}

export interface ActionEditorProps extends WithControlledProp<BindableAttrValue<any> | null> {}

function ActionEditor({ value, onChange }: ActionEditorProps) {
  const [activeTab, setActiveTab] = React.useState<BindableType>(getActionTab(value));
  React.useEffect(() => setActiveTab(getActionTab(value)), [value]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: BindableType) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="Choose action kind ">
            <Tab label="JS expression" value="jsExpressionAction" />
            <Tab label="Navigation" value="navigationAction" />
          </TabList>
        </Box>
        <TabPanel value="jsExpressionAction" disableGutters>
          <JsExpressionActionEditor
            value={value?.type === 'jsExpressionAction' ? value : null}
            onChange={onChange}
          />
        </TabPanel>
        <TabPanel value="navigationAction" disableGutters>
          <NavigationActionEditor
            value={value?.type === 'navigationAction' ? value : null}
            onChange={onChange}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export interface BindingEditorDialogProps<V>
  extends WithControlledProp<BindableAttrValue<V> | null> {
  open: boolean;
  onClose: () => void;
}

export function BindingEditorDialog<V>({
  value,
  onChange,
  open,
  onClose,
}: BindingEditorDialogProps<V>) {
  const { propType, label } = useBindingEditorContext();

  const [input, setInput] = React.useState(value);
  React.useEffect(() => {
    setInput(value);
  }, [open, value]);

  const committedInput = React.useRef<BindableAttrValue<V> | null>(input);

  const handleSave = React.useCallback(() => {
    let newValue = input;

    if (input?.type === 'jsExpression') {
      newValue = {
        ...input,
        value: tryFormatExpression(input.value),
      };
    }

    committedInput.current = newValue;
    onChange(newValue);
  }, [onChange, input]);

  const hasUnsavedChanges = input
    ? input.type !== committedInput.current?.type || input.value !== committedInput.current?.value
    : false;

  const { handleCloseWithUnsavedChanges } = useUnsavedChangesConfirm({
    hasUnsavedChanges,
    onClose,
  });

  const handleCommit = React.useCallback(() => {
    handleSave();
    onClose();
  }, [onClose, handleSave]);

  const handleRemove = React.useCallback(() => {
    committedInput.current = null;
    onChange(null);

    onClose();
  }, [onClose, onChange]);

  useShortcut({ key: 's', metaKey: true, disabled: !open }, handleSave);

  return (
    <Dialog
      onClose={handleCloseWithUnsavedChanges}
      open={open}
      fullWidth
      scroll="body"
      maxWidth="lg"
    >
      <DialogTitle>Bind property &quot;{label}&quot;</DialogTitle>
      <DialogContent
        sx={{
          height: '100vh',
          maxHeight: 560,
        }}
      >
        {propType?.type === 'event' ? (
          <ActionEditor value={input} onChange={(newValue) => setInput(newValue)} />
        ) : (
          <ValueBindingEditor
            value={input?.type === 'jsExpression' || input?.type === 'env' ? input : null}
            onChange={(newValue) => setInput(newValue)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="text" onClick={onClose}>
          {hasUnsavedChanges ? 'Cancel' : 'Close'}
        </Button>
        <Button color="inherit" disabled={!value?.value} onClick={handleRemove}>
          Remove binding
        </Button>
        <Button disabled={!hasUnsavedChanges} color="primary" onClick={handleCommit}>
          Update binding
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface BindingEditorProps<V> extends WithControlledProp<BindableAttrValue<V> | null> {
  label: string;
  globalScope: Record<string, unknown>;
  globalScopeMeta?: ScopeMeta;
  /**
   * Uses the QuickJs runtime to evaluate bindings, just like on the server
   */
  jsRuntime: JsRuntime;
  disabled?: boolean;
  hidden?: boolean;
  propType?: PropValueType;
  liveBinding?: LiveBinding;
  envVarNames?: string[];
}

export function BindingEditor<V>({
  label,
  globalScope,
  globalScopeMeta,
  jsRuntime,
  disabled,
  hidden = false,
  propType,
  value,
  onChange,
  liveBinding,
  envVarNames,
}: BindingEditorProps<V>) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);

  const hasBinding: boolean = !!value && value.type !== 'const';

  const error: string | undefined = liveBinding?.error?.message;

  const bindingButton = (
    <Checkbox
      aria-label={`Bind property "${label}"`}
      checked={hasBinding}
      disabled={disabled}
      icon={<AddLinkIcon />}
      checkedIcon={<LinkIcon />}
      onClick={handleOpen}
      color={error ? 'error' : undefined}
      sx={{ visibility: hidden ? 'hidden' : 'visible' }}
    />
  );

  const TooltipComponent = error ? ErrorTooltip : Tooltip;
  const tooltipTitle: string =
    error ?? (hasBinding ? `Update "${label}" binding…` : `Bind "${label}"…`);
  const bindingButtonWithTooltip = disabled ? (
    bindingButton
  ) : (
    <TooltipComponent disableInteractive placement="top" title={tooltipTitle}>
      {bindingButton}
    </TooltipComponent>
  );

  const resolvedMeta = React.useMemo(() => {
    const meta: ScopeMeta = { ...globalScopeMeta };
    if (propType?.type === 'event' && propType.arguments) {
      for (const { name, tsType } of propType.arguments) {
        const metaField: ScopeMetaField = meta[name] ?? {};
        metaField.kind = 'local';
        metaField.tsType = tsType;
        meta[name] = metaField;
      }
    }

    return meta;
  }, [propType, globalScopeMeta]);

  const bindingEditorContext: BindingEditorContext = React.useMemo(
    () => ({
      label,
      globalScope,
      globalScopeMeta: resolvedMeta,
      jsRuntime,
      disabled,
      propType,
      liveBinding,
      envVarNames,
    }),
    [disabled, envVarNames, globalScope, jsRuntime, label, liveBinding, propType, resolvedMeta],
  );

  return (
    <BindingEditorContextProvider value={bindingEditorContext}>
      {bindingButtonWithTooltip}
      <BindingEditorDialog open={open} onClose={handleClose} value={value} onChange={onChange} />
    </BindingEditorContextProvider>
  );
}
