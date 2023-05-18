import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  inferColumns,
  NumberFormat,
  NUMBER_FORMAT_PRESETS,
  SerializableGridColumn,
  SerializableGridColumns,
} from '@mui/toolpad-components';
import { generateUniqueString } from '@mui/toolpad-utils/strings';
import type { EditorProps } from '../../types';
import { useToolpadComponents } from '../AppEditor/toolpadComponents';
import { ToolpadComponentDefinition } from '../../toolpadComponents';
import { useDom } from '../AppState';
import PropertyControl from '../../components/PropertyControl';

// TODO: this import suggests leaky abstraction
import { usePageEditorState } from '../AppEditor/PageEditor/PageEditorProvider';

type GridAlignment = SerializableGridColumn['align'];

const COLUMN_TYPES: string[] = [
  'string',
  'number',
  'date',
  'dateTime',
  'boolean',
  'link',
  'image',
  'codeComponent',
];
const ALIGNMENTS: GridAlignment[] = ['left', 'right', 'center'];

function formatNumberOptionValue(numberFormat: NumberFormat | undefined) {
  if (!numberFormat) {
    return 'plain';
  }
  switch (numberFormat.kind) {
    case 'preset':
      return `preset:${numberFormat.preset}`;
    case 'custom':
      return 'custom';
    case 'currency':
      return 'currency';
    default:
      return 'plain';
  }
}

function GridColumnsPropEditor({
  propType,
  label,
  nodeId,
  value = [],
  onChange,
  disabled,
}: EditorProps<SerializableGridColumns>) {
  const { bindings } = usePageEditorState();
  const [editedIndex, setEditedIndex] = React.useState<number | null>(null);
  const { dom } = useDom();
  const toolpadComponents = useToolpadComponents(dom);
  const codeComponents: ToolpadComponentDefinition[] = React.useMemo(() => {
    return Object.values(toolpadComponents)
      .filter(Boolean)
      .filter((definition) => !definition.builtIn);
  }, [toolpadComponents]);

  const editedColumn = typeof editedIndex === 'number' ? value[editedIndex] : null;

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const rowsValue = nodeId && bindings[`${nodeId}.props.rows`];
  const definedRows: unknown = rowsValue?.value;

  const inferredColumns = React.useMemo(
    () => inferColumns(Array.isArray(definedRows) ? definedRows : []),
    [definedRows],
  );

  const columnSuggestions = React.useMemo(() => {
    const existingFields = new Set(value.map(({ field }) => field));
    return inferredColumns.filter((column) => !existingFields.has(column.field));
  }, [inferredColumns, value]);
  const hasColumnSuggestions = columnSuggestions.length > 0;

  const handleCreateColumn = React.useCallback(
    (suggestion: SerializableGridColumn) => () => {
      const existingFields = new Set(value.map(({ field }) => field));
      const newFieldName = generateUniqueString(suggestion.field, existingFields);
      const newValue = [...value, { ...suggestion, field: newFieldName }];
      onChange(newValue);
      setEditedIndex(newValue.length - 1);
      handleClose();
    },
    [value, onChange],
  );

  const handleColumnItemClick = React.useCallback(
    (index: number) => () => {
      setEditedIndex(index);
    },
    [],
  );

  const handleColumnChange = React.useCallback<React.Dispatch<SerializableGridColumn>>(
    (newValue) => {
      onChange(value.map((column, i) => (i === editedIndex ? newValue : column)));
    },
    [editedIndex, onChange, value],
  );

  const handleColumnDelete = React.useCallback(
    (deletedIndex: number) => (event: React.MouseEvent) => {
      event.stopPropagation();
      onChange(value.filter((column, i) => i !== deletedIndex));
    },
    [onChange, value],
  );

  const handleRecreateColumns = React.useCallback(() => {
    if (hasColumnSuggestions) {
      onChange(inferredColumns);
    }
  }, [hasColumnSuggestions, inferredColumns, onChange]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverIdValue = React.useId();
  const popoverId = open ? popoverIdValue : undefined;

  React.useEffect(() => {
    if (open) {
      setEditedIndex(null);
    }
  }, [open]);

  return (
    <React.Fragment>
      <PropertyControl propType={propType}>
        <Button aria-describedby={popoverId} onClick={handlePopoverClick}>
          {label}
        </Button>
      </PropertyControl>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box sx={{ minWidth: 300, p: 2 }}>
          {editedColumn ? (
            <React.Fragment>
              <IconButton aria-label="Back" onClick={() => setEditedIndex(null)}>
                <ArrowBackIcon />
              </IconButton>
              <Stack gap={1} py={1}>
                <TextField
                  label="field"
                  value={editedColumn.field}
                  disabled={disabled}
                  onChange={(event) =>
                    handleColumnChange({ ...editedColumn, field: event.target.value })
                  }
                />

                <TextField
                  label="header"
                  value={editedColumn.headerName}
                  disabled={disabled}
                  onChange={(event) =>
                    handleColumnChange({ ...editedColumn, headerName: event.target.value })
                  }
                />

                <TextField
                  select
                  fullWidth
                  label="align"
                  value={editedColumn.align ?? ''}
                  disabled={disabled}
                  onChange={(event) =>
                    handleColumnChange({
                      ...editedColumn,
                      align: (event.target.value as GridAlignment) || undefined,
                    })
                  }
                >
                  {ALIGNMENTS.map((alignment) => (
                    <MenuItem key={alignment} value={alignment}>
                      {alignment}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="width"
                  type="number"
                  value={editedColumn.width}
                  disabled={disabled}
                  onChange={(event) =>
                    handleColumnChange({ ...editedColumn, width: Number(event.target.value) })
                  }
                />

                <TextField
                  select
                  fullWidth
                  label="type"
                  value={editedColumn.type ?? ''}
                  disabled={disabled}
                  onChange={(event) =>
                    handleColumnChange({
                      ...editedColumn,
                      type: event.target.value,
                      numberFormat: undefined,
                    })
                  }
                >
                  {COLUMN_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>

                {editedColumn.type === 'number' ? (
                  <React.Fragment>
                    <TextField
                      select
                      fullWidth
                      label="number format"
                      value={formatNumberOptionValue(editedColumn.numberFormat)}
                      disabled={disabled}
                      onChange={(event) => {
                        let numberFormat: NumberFormat | undefined;

                        if (event.target.value === 'currency') {
                          numberFormat = {
                            kind: 'currency',
                            currency: 'USD',
                          };
                        } else if (event.target.value === 'custom') {
                          numberFormat = {
                            kind: 'custom',
                            custom: {},
                          };
                        } else if (event.target.value) {
                          const [prefix, id] = event.target.value.split(':');

                          if (prefix === 'preset') {
                            numberFormat = {
                              kind: 'preset',
                              preset: id,
                            };
                          }
                        }

                        handleColumnChange({ ...editedColumn, numberFormat });
                      }}
                    >
                      <MenuItem value="plain">plain</MenuItem>
                      {Array.from(NUMBER_FORMAT_PRESETS.keys(), (type) => (
                        <MenuItem key={type} value={`preset:${type}`}>
                          {type}
                        </MenuItem>
                      ))}
                      <MenuItem value="currency">currency</MenuItem>
                      <MenuItem value="custom">custom</MenuItem>
                    </TextField>

                    {editedColumn.numberFormat?.kind === 'currency' ? (
                      <TextField
                        fullWidth
                        label="currency code"
                        value={editedColumn.numberFormat.currency}
                        disabled={disabled}
                        onChange={(event) => {
                          handleColumnChange({
                            ...editedColumn,
                            numberFormat: {
                              ...editedColumn.numberFormat,
                              kind: 'currency',
                              currency: event.target.value,
                            },
                          });
                        }}
                      />
                    ) : null}
                  </React.Fragment>
                ) : null}

                {editedColumn.type === 'codeComponent' ? (
                  <TextField
                    select
                    required
                    fullWidth
                    label="Custom component"
                    value={editedColumn.codeComponent ?? ''}
                    disabled={disabled}
                    error={!editedColumn.codeComponent}
                    helperText={
                      editedColumn.codeComponent ? undefined : 'Please select a component'
                    }
                    onChange={(event) =>
                      handleColumnChange({
                        ...editedColumn,
                        codeComponent: event.target.value,
                      })
                    }
                  >
                    {codeComponents.map(({ displayName }) => (
                      <MenuItem key={displayName} value={displayName}>
                        {displayName}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
              </Stack>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Tooltip describeChild title="Recreate columns">
                <span>
                  <IconButton
                    aria-label="Recreate columns"
                    onClick={handleRecreateColumns}
                    disabled={!hasColumnSuggestions}
                  >
                    <RefreshIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Add column">
                <IconButton onClick={handleMenuClick} disabled={disabled}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="new-column-menu"
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {columnSuggestions.map((suggestion) => (
                  <MenuItem key={suggestion.field} onClick={handleCreateColumn(suggestion)}>
                    {suggestion.field}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCreateColumn({ field: 'new' })}>New column</MenuItem>
              </Menu>
              <List>
                {value.map((colDef, i) => {
                  return (
                    <ListItem
                      key={colDef.field}
                      disableGutters
                      onClick={handleColumnItemClick(i)}
                      secondaryAction={
                        <IconButton
                          aria-label="Remove column"
                          edge="end"
                          onClick={handleColumnDelete(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton>
                        <ListItemText primary={colDef.headerName || colDef.field} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          )}
        </Box>
      </Popover>
    </React.Fragment>
  );
}

export default GridColumnsPropEditor;
