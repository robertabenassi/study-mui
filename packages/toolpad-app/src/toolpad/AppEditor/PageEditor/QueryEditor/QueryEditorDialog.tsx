import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Divider,
  Alert,
  Box,
  MenuItem,
} from '@mui/material';
import * as React from 'react';
import { BindableAttrValue } from '@mui/toolpad-core';
import { useBrowserJsRuntime } from '@mui/toolpad-core/jsBrowserRuntime';
import useLatest from '../../../../utils/useLatest';
import { usePageEditorState } from '../PageEditorProvider';
import * as appDom from '../../../../appDom';
import dataSources from '../../../../toolpadDataSources/client';
import { omit, update } from '../../../../utils/immutability';
import { useEvaluateLiveBinding } from '../../useEvaluateLiveBinding';
import { useDom } from '../../../AppState';
import { ConnectionContextProvider } from '../../../../toolpadDataSources/context';
import ConnectionSelect, { ConnectionOption } from '../ConnectionSelect';
import BindableEditor from '../BindableEditor';
import { ConfirmDialog } from '../../../../components/SystemDialogs';
import useBoolean from '../../../../utils/useBoolean';
import { useNodeNameValidation } from '../../HierarchyExplorer/validation';
import useEvent from '../../../../utils/useEvent';
import useUnsavedChangesConfirm from '../../../hooks/useUnsavedChangesConfirm';

interface QueryEditorDialogActionsProps {
  saveDisabled?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
  isDraft?: boolean;
  onClose?: () => void;
}

function QueryEditorDialogActions({
  saveDisabled,
  onSave,
  onRemove,
  onClose,
  isDraft,
}: QueryEditorDialogActionsProps) {
  const {
    value: removeConfirmOpen,
    setTrue: handleRemoveConfirmOpen,
    setFalse: handleRemoveConfirmclose,
  } = useBoolean(false);

  const handleRemoveConfirm = React.useCallback(
    (confirmed: boolean) => {
      handleRemoveConfirmclose();
      if (confirmed) {
        onRemove?.();
      }
    },
    [handleRemoveConfirmclose, onRemove],
  );

  return (
    <DialogActions>
      <Button color="inherit" variant="text" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleRemoveConfirmOpen} disabled={isDraft}>
        Remove
      </Button>
      <ConfirmDialog open={removeConfirmOpen} onClose={handleRemoveConfirm} severity="error">
        Are you sure your want to remove this query?
      </ConfirmDialog>
      <Button disabled={saveDisabled} onClick={onSave}>
        Save
      </Button>
    </DialogActions>
  );
}

function refetchIntervalInSeconds(maybeInterval?: number) {
  if (typeof maybeInterval !== 'number') {
    return undefined;
  }
  const seconds = Math.floor(maybeInterval / 1000);
  return seconds > 0 ? seconds : undefined;
}

interface QueryNodeEditorProps<Q> {
  open: boolean;
  onClose: () => void;
  onSave: (newNode: appDom.QueryNode) => void;
  onRemove: (newNode: appDom.QueryNode) => void;
  node: appDom.QueryNode<Q>;
  isDraft: boolean;
}

export default function QueryNodeEditorDialog<Q>({
  open,
  node: nodeProp,
  onClose,
  onRemove,
  onSave,
  isDraft,
}: QueryNodeEditorProps<Q>) {
  const { dom } = useDom();

  // To keep it around during closing animation
  const node = useLatest(nodeProp);

  const [input, setInput] = React.useState<appDom.QueryNode<Q>>(node);
  React.useEffect(() => {
    setInput(node);
  }, [node]);

  const reset = useEvent(() => setInput(node));

  React.useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const connectionId = input.attributes.connectionId.value
    ? appDom.deref(input.attributes.connectionId.value)
    : null;

  const connection = connectionId ? appDom.getMaybeNode(dom, connectionId, 'connection') : null;
  const dataSourceId = input.attributes.dataSource?.value || null;
  const dataSource = (dataSourceId && dataSources[dataSourceId]) || null;

  const connectionParams = connection?.attributes.params.value;

  const handleCommit = React.useCallback(() => {
    let toCommit: appDom.QueryNode<Q> = input;
    if (dataSource?.transformQueryBeforeCommit) {
      toCommit = {
        ...input,
        attributes: {
          ...input.attributes,
          query: appDom.createConst(
            dataSource.transformQueryBeforeCommit(input.attributes.query.value),
          ),
        },
      };
    }
    onSave(toCommit);
  }, [dataSource, input, onSave]);

  const { pageState, globalScopeMeta } = usePageEditorState();

  const handleConnectionChange = React.useCallback(
    (newConnectionOption: ConnectionOption | null) => {
      if (newConnectionOption) {
        setInput((existing) =>
          update(existing, {
            attributes: update(existing.attributes, {
              connectionId: appDom.createConst(appDom.ref(newConnectionOption.connectionId)),
              dataSource: appDom.createConst(newConnectionOption.dataSourceId),
            }),
          }),
        );
      } else {
        setInput((existing) =>
          update(existing, {
            attributes: update(existing.attributes, {
              connectionId: undefined,
              dataSource: undefined,
            }),
          }),
        );
      }
    },
    [],
  );

  const handleModeChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((existing) =>
      update(existing, {
        attributes: update(existing.attributes, {
          mode: appDom.createConst(event.target.value as appDom.FetchMode),
        }),
      }),
    );
  }, []);

  const handleEnabledChange = React.useCallback((newValue: BindableAttrValue<boolean> | null) => {
    setInput((existing) =>
      update(existing, {
        attributes: update(existing.attributes, {
          enabled: newValue || undefined,
        }),
      }),
    );
  }, []);

  const handleRefetchIntervalChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const interval = Number(event.target.value);

      setInput((existing) =>
        update(existing, {
          attributes:
            Number.isNaN(interval) || interval <= 0
              ? omit(existing.attributes, 'refetchInterval')
              : update(existing.attributes, {
                  refetchInterval: appDom.createConst(interval * 1000),
                }),
        }),
      );
    },
    [],
  );

  const handleRemove = React.useCallback(() => {
    if (!isDraft) {
      onRemove(node);
    }
    onClose();
  }, [isDraft, onClose, onRemove, node]);

  const isInputSaved = !isDraft && node === input;

  const { handleCloseWithUnsavedChanges } = useUnsavedChangesConfirm({
    hasUnsavedChanges: !isInputSaved,
    onClose,
  });

  const handleSave = React.useCallback(() => {
    handleCommit();
    onClose();
  }, [handleCommit, onClose]);

  const queryEditorContext = React.useMemo(
    () => (dataSourceId ? { dataSourceId, connectionId } : null),
    [dataSourceId, connectionId],
  );

  const jsBrowserRuntime = useBrowserJsRuntime();

  const liveEnabled = useEvaluateLiveBinding({
    jsRuntime: jsBrowserRuntime,
    input: input.attributes.enabled || null,
    globalScope: pageState,
  });

  const mode = input.attributes.mode?.value || 'query';

  const existingNames = React.useMemo(
    () => appDom.getExistingNamesForNode(dom, input),
    [dom, input],
  );

  const nodeNameError = useNodeNameValidation(input.name, existingNames, 'query');
  const isNameValid = !nodeNameError;

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={handleCloseWithUnsavedChanges}>
      {dataSourceId && dataSource && queryEditorContext ? (
        <ConnectionContextProvider value={queryEditorContext}>
          <DialogTitle>
            <Stack direction="row" gap={2}>
              <TextField
                required
                autoFocus
                fullWidth
                label="name"
                value={input.name}
                onChange={(event) =>
                  setInput((existing) => ({ ...existing, name: event.target.value }))
                }
                error={!isNameValid}
                helperText={nodeNameError}
              />
              <ConnectionSelect
                dataSource={dataSourceId}
                value={
                  input.attributes.dataSource
                    ? {
                        connectionId: appDom.deref(input.attributes.connectionId.value) || null,
                        dataSourceId: input.attributes.dataSource.value,
                      }
                    : null
                }
                onChange={handleConnectionChange}
              />
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              // height will be clipped by max-height
              height: '100vh',
              p: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                position: 'relative',
                display: 'flex',
              }}
            >
              <dataSource.QueryEditor
                connectionParams={connectionParams}
                value={input}
                onChange={setInput}
                onCommit={handleCommit}
                globalScope={pageState}
                globalScopeMeta={globalScopeMeta}
              />
            </Box>
            <Stack direction="row" alignItems="center" sx={{ pt: 2, px: 3, gap: 2 }}>
              <TextField select label="mode" value={mode} onChange={handleModeChange}>
                <MenuItem value="query">
                  Fetch at any time to always be available on the page
                </MenuItem>
                <MenuItem value="mutation">Only fetch on manual action</MenuItem>
              </TextField>
              <BindableEditor<boolean>
                liveBinding={liveEnabled}
                globalScope={pageState}
                globalScopeMeta={globalScopeMeta}
                jsRuntime={jsBrowserRuntime}
                label="Enabled"
                propType={{ type: 'boolean' }}
                value={input.attributes.enabled ?? appDom.createConst(true)}
                onChange={handleEnabledChange}
                disabled={mode !== 'query'}
              />
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">s</InputAdornment>,
                }}
                sx={{ maxWidth: 300 }}
                type="number"
                label="Refetch interval"
                value={refetchIntervalInSeconds(input.attributes.refetchInterval?.value) ?? ''}
                onChange={handleRefetchIntervalChange}
                disabled={mode !== 'query'}
              />
            </Stack>
          </DialogContent>
          <QueryEditorDialogActions
            onSave={handleSave}
            onClose={onClose}
            onRemove={handleRemove}
            isDraft={isDraft}
            saveDisabled={isInputSaved || !isNameValid}
          />
        </ConnectionContextProvider>
      ) : (
        <Alert severity="error">Datasource &quot;{dataSourceId}&quot; not found</Alert>
      )}
    </Dialog>
  );
}
