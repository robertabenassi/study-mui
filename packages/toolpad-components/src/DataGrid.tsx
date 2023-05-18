import {
  DataGridProProps,
  DataGridPro,
  GridToolbar,
  GridColumnResizeParams,
  GridRowsProp,
  GridColumnOrderChangeParams,
  useGridApiContext,
  gridColumnsTotalWidthSelector,
  gridColumnPositionsSelector,
  GridRowSelectionModel,
  GridValueFormatterParams,
  GridColDef,
  GridValueGetterParams,
  useGridApiRef,
  GridColumnTypesRecord,
  GridRenderCellParams,
  useGridRootProps,
  gridDensityFactorSelector,
  useGridSelector,
  getGridDefaultColumnTypes,
} from '@mui/x-data-grid-pro';
import * as React from 'react';
import { useNode, createComponent, useComponents } from '@mui/toolpad-core';
import {
  Box,
  debounce,
  LinearProgress,
  Skeleton,
  Link,
  styled,
  Typography,
  Tooltip,
  Popover,
} from '@mui/material';
import { getObjectKey } from '@mui/toolpad-core/objectKey';
import { errorFrom } from '@mui/toolpad-utils/errors';
import { hasImageExtension } from '@mui/toolpad-core/path';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { SX_PROP_HELPER_TEXT } from './constants.js';

const DEFAULT_COLUMN_TYPES = getGridDefaultColumnTypes();

// Pseudo random number. See https://stackoverflow.com/a/47593316
function mulberry32(a: number): () => number {
  return () => {
    /* eslint-disable */
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    /* eslint-enable */
  };
}

function randomBetween(seed: number, min: number, max: number): () => number {
  const random = mulberry32(seed);
  return () => min + (max - min) * random();
}

const SkeletonCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function SkeletonLoadingOverlay() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  const dimensions = apiRef.current?.getRootDimensions();
  const viewportHeight = dimensions?.viewportInnerSize.height ?? 0;

  const factor = useGridSelector(apiRef, gridDensityFactorSelector);
  const rowHeight = Math.floor(rootProps.rowHeight * factor);

  const skeletonRowsCount = Math.ceil(viewportHeight / rowHeight);

  const totalWidth = gridColumnsTotalWidthSelector(apiRef);
  const positions = gridColumnPositionsSelector(apiRef);
  const inViewportCount = React.useMemo(
    () => positions.filter((value) => value <= totalWidth).length,
    [totalWidth, positions],
  );
  const columns = apiRef.current.getVisibleColumns().slice(0, inViewportCount);

  const children = React.useMemo(() => {
    // reseed random number generator to create stable lines betwen renders
    const random = randomBetween(12345, 25, 75);
    const array: React.ReactNode[] = [];

    for (let i = 0; i < skeletonRowsCount; i += 1) {
      for (const column of columns) {
        const width = Math.round(random());
        array.push(
          <SkeletonCell key={`col-${column.field}-${i}`} sx={{ justifyContent: column.align }}>
            <Skeleton sx={{ mx: 1 }} width={`${width}%`} />
          </SkeletonCell>,
        );
      }
      array.push(<SkeletonCell key={`fill-${i}`} />);
    }
    return array;
  }, [skeletonRowsCount, columns]);

  const rowsCount = apiRef.current.getRowsCount();

  return rowsCount > 0 ? (
    <LinearProgress />
  ) : (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${columns
          .map(({ computedWidth }) => `${computedWidth}px`)
          .join(' ')} 1fr`,
        gridAutoRows: `${rowHeight}px`,
      }}
    >
      {children}
    </div>
  );
}

function inferColumnType(value: unknown): string {
  if (value instanceof Date) {
    return 'dateTime';
  }
  const valueType = typeof value;
  switch (typeof value) {
    case 'number':
    case 'boolean':
      return valueType;
    case 'string':
      try {
        const url = new URL(value);

        if (hasImageExtension(url.pathname)) {
          return 'image';
        }

        return 'link';
      } catch (error) {
        return valueType;
      }
    case 'object':
      return 'json';
    default:
      return 'string';
  }
}

function ImageCell({ field, id, value: src }: GridRenderCellParams<any, any, any>) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popoverId = React.useId();

  const alt = `${field} ${id}`;

  return (
    <React.Fragment>
      <Box
        aria-owns={open ? popoverId : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        component="img"
        src={src}
        alt={alt}
        sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', py: 1 }}
      />
      <Popover
        id={popoverId}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{ maxWidth: '60vw', maxHeight: '60vh', objectFit: 'contain', m: 1 }}
        />
      </Popover>
    </React.Fragment>
  );
}

function dateValueGetter({ value }: GridValueGetterParams<any, any>) {
  return typeof value === 'number' ? new Date(value) : value;
}

function ComponentErrorFallback({ error }: FallbackProps) {
  return (
    <Typography variant="overline" sx={{ color: 'error.main', fontSize: '10px' }}>
      Code component error{' '}
      <Tooltip title={error.message}>
        <span>ℹ️</span>
      </Tooltip>
    </Typography>
  );
}

interface CustomColumnProps {
  params: GridRenderCellParams;
}

function CustomColumn({ params }: CustomColumnProps) {
  const { value, colDef, row, field } = params;
  const column = colDef as SerializableGridColumn;
  const components = useComponents();
  const Component = components[`codeComponent.${column.codeComponent}`];

  if (!Component) {
    return (
      <Typography variant="overline" sx={{ color: 'error.main', fontSize: '10px' }}>
        No component selected
      </Typography>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ComponentErrorFallback}>
      <Component value={value} row={row} field={field} />
    </ErrorBoundary>
  );
}

export const CUSTOM_COLUMN_TYPES: GridColumnTypesRecord = {
  json: {
    valueFormatter: ({ value: cellValue }: GridValueFormatterParams) => JSON.stringify(cellValue),
  },
  date: {
    extendType: 'date',
    valueGetter: dateValueGetter,
  },
  dateTime: {
    extendType: 'date',
    valueGetter: dateValueGetter,
  },
  link: {
    renderCell: ({ value }) => (
      <Link href={value} target="_blank" rel="noopener noreferrer nofollow">
        {value}
      </Link>
    ),
  },
  image: {
    renderCell: ({ value, ...params }) => (value ? <ImageCell value={value} {...params} /> : ''),
  },
  codeComponent: {
    renderCell: (params: GridRenderCellParams) => {
      return <CustomColumn params={params} />;
    },
  },
};

export const NUMBER_FORMAT_PRESETS = new Map<string, { options?: Intl.NumberFormatOptions }>([
  [
    'bytes',
    {
      options: {
        style: 'unit',
        maximumSignificantDigits: 3,
        notation: 'compact',
        unit: 'byte',
        unitDisplay: 'narrow',
      },
    },
  ],
  [
    'percent',
    {
      options: {
        style: 'percent',
      },
    },
  ],
]);

export type NumberFormat =
  | {
      kind: 'preset';
      preset: string;
    }
  | {
      kind: 'currency';
      currency?: string;
    }
  | {
      kind: 'custom';
      custom: Intl.NumberFormatOptions;
    };

export interface SerializableGridColumn
  extends Pick<GridColDef, 'field' | 'type' | 'align' | 'width' | 'headerName'> {
  numberFormat?: NumberFormat;
  codeComponent?: string;
}

export type SerializableGridColumns = SerializableGridColumn[];

export function inferColumns(rows: GridRowsProp): SerializableGridColumns {
  if (rows.length < 1) {
    return [];
  }
  // Naive implementation that checks only the first row
  const firstRow = rows[0];
  return Object.entries(firstRow).map(([field, value]) => {
    return {
      field,
      type: inferColumnType(value),
    };
  });
}

function createNumericFormatter(
  format: (value: number) => string,
): (params: GridValueFormatterParams<unknown>) => string {
  return ({ value }) => (typeof value === 'number' ? format(value) : String(value || ''));
}

export function parseColumns(columns: SerializableGridColumns): GridColDef[] {
  return columns.map((column) => {
    if (column.type === 'number' && column.numberFormat) {
      switch (column.numberFormat.kind) {
        case 'preset': {
          const preset = NUMBER_FORMAT_PRESETS.get(column.numberFormat.preset);
          const { format } = new Intl.NumberFormat(undefined, preset?.options);
          return {
            ...column,
            valueFormatter: createNumericFormatter((value) => format(value)),
          };
        }
        case 'custom': {
          const { format } = new Intl.NumberFormat(undefined, column.numberFormat.custom);
          return {
            ...column,
            valueFormatter: createNumericFormatter((value) => format(value)),
          };
        }
        case 'currency': {
          const userInput = column.numberFormat.currency || 'USD';
          if (/[a-z]{3}/i.test(userInput)) {
            const { format } = new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: userInput,
            });
            return {
              ...column,
              valueFormatter: createNumericFormatter((value) => format(value)),
            };
          }
          const { format } = new Intl.NumberFormat(undefined, {});
          return {
            ...column,
            valueFormatter: createNumericFormatter((value) => `${userInput} ${format(value)}`),
          };
        }
        default: {
          return column;
        }
      }
    }

    const customType = column.type ? CUSTOM_COLUMN_TYPES[column.type] : {};

    const type = column.type && column.type in DEFAULT_COLUMN_TYPES ? column.type : undefined;

    return { ...customType, ...column, type };
  });
}

const EMPTY_ROWS: GridRowsProp = [];

interface Selection {
  id?: any;
}

interface ToolpadDataGridProps extends Omit<DataGridProProps, 'columns' | 'rows' | 'error'> {
  rows?: GridRowsProp;
  columns?: SerializableGridColumns;
  height?: number;
  rowIdField?: string;
  error?: Error | string;
  selection?: Selection | null;
  onSelectionChange?: (newSelection?: Selection | null) => void;
  hideToolbar?: boolean;
}

const DataGridComponent = React.forwardRef(function DataGridComponent(
  {
    columns: columnsProp,
    rows: rowsProp,
    height: heightProp,
    rowIdField: rowIdFieldProp,
    error: errorProp,
    selection,
    onSelectionChange,
    hideToolbar,
    ...props
  }: ToolpadDataGridProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const nodeRuntime = useNode<ToolpadDataGridProps>();

  const handleResize = React.useMemo(
    () =>
      debounce((params: GridColumnResizeParams) => {
        if (!nodeRuntime) {
          return;
        }

        nodeRuntime.updateAppDomConstProp('columns', (columns) =>
          columns?.map((column) =>
            column.field === params.colDef.field ? { ...column, width: params.width } : column,
          ),
        );
      }, 500),
    [nodeRuntime],
  );
  React.useEffect(() => handleResize.clear(), [handleResize]);

  const handleColumnOrderChange = React.useMemo(
    () =>
      debounce((params: GridColumnOrderChangeParams) => {
        if (!nodeRuntime) {
          return;
        }

        nodeRuntime.updateAppDomConstProp('columns', (columns) => {
          if (!columns) {
            return columns;
          }
          const old = columns.find((colDef) => colDef.field === params.column.field);
          if (!old) {
            return columns;
          }
          const withoutOld = columns.filter((column) => column.field !== params.column.field);
          return [
            ...withoutOld.slice(0, params.targetIndex),
            old,
            ...withoutOld.slice(params.targetIndex),
          ];
        });
      }, 500),
    [nodeRuntime],
  );
  React.useEffect(() => handleColumnOrderChange.clear(), [handleColumnOrderChange]);

  const rowsInput = rowsProp || EMPTY_ROWS;

  const hasExplicitRowId: boolean = React.useMemo(() => {
    const hasRowIdField: boolean = !!(rowIdFieldProp && rowIdFieldProp !== 'id');
    const parsedRows = rowsInput;
    return parsedRows.length === 0 || hasRowIdField || !!parsedRows[0].id;
  }, [rowIdFieldProp, rowsInput]);

  const rows: GridRowsProp = React.useMemo(
    () => (hasExplicitRowId ? rowsInput : rowsInput.map((row, id) => ({ ...row, id }))),
    [hasExplicitRowId, rowsInput],
  );

  const columnsInitRef = React.useRef(false);
  const hasColumnsDefined = columnsProp && columnsProp.length > 0;

  React.useEffect(() => {
    if (!nodeRuntime || hasColumnsDefined || rows.length <= 0 || columnsInitRef.current) {
      return;
    }

    let inferredColumns = inferColumns(rows);

    if (!hasExplicitRowId) {
      inferredColumns = inferredColumns.filter((column) => column.field !== 'id');
    }

    nodeRuntime.updateAppDomConstProp('columns', inferredColumns);

    columnsInitRef.current = true;
  }, [hasColumnsDefined, rows, nodeRuntime, hasExplicitRowId]);

  const getRowId = React.useCallback(
    (row: any) => {
      return rowIdFieldProp && row[rowIdFieldProp] ? row[rowIdFieldProp] : row.id;
    },
    [rowIdFieldProp],
  );

  const onSelectionModelChange = React.useCallback(
    (ids: GridRowSelectionModel) => {
      onSelectionChange?.(ids.length > 0 ? rows.find((row) => row.id === ids[0]) : null);
    },
    [rows, onSelectionChange],
  );

  const selectionModel = React.useMemo(
    () => (selection?.id ? [selection.id] : []),
    [selection?.id],
  );

  const columns: GridColDef[] = React.useMemo(
    () => (columnsProp ? parseColumns(columnsProp) : []),
    [columnsProp],
  );

  const apiRef = useGridApiRef();
  React.useEffect(() => apiRef.current.updateColumns(columns), [apiRef, columns]);

  // The grid doesn't update when the getRowId or columns properties change, so it needs to be remounted
  // TODO: remove columns from this equation once https://github.com/mui/mui-x/issues/5970 gets resolved
  const gridKey = React.useMemo(
    () => [getObjectKey(getRowId), getObjectKey(columns)].join('::'),
    [getRowId, columns],
  );

  const error = errorProp ? errorFrom(errorProp) : null;

  return (
    <div ref={ref} style={{ height: heightProp, minHeight: '100%', width: '100%' }}>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <DataGridPro
          apiRef={apiRef}
          components={{
            Toolbar: hideToolbar ? null : GridToolbar,
            LoadingOverlay: SkeletonLoadingOverlay,
          }}
          onColumnResize={handleResize}
          onColumnOrderChange={handleColumnOrderChange}
          rows={rows}
          columns={columns}
          key={gridKey}
          getRowId={getRowId}
          onRowSelectionModelChange={onSelectionModelChange}
          rowSelectionModel={selectionModel}
          {...props}
        />
      )}
    </div>
  );
});

export default createComponent(DataGridComponent, {
  helperText:
    'The MUI X [Data Grid](https://mui.com/x/react-data-grid/) component.\n\nThe datagrid lets users display tabular data in a flexible grid.',
  errorProp: 'error',
  loadingPropSource: ['rows', 'columns'],
  loadingProp: 'loading',
  resizableHeightProp: 'height',
  argTypes: {
    rows: {
      helperText: 'The data to be displayed as rows. Must be an array of objects.',
      type: 'array',
      schema: '/schemas/DataGridRows.json',
    },
    columns: {
      helperText: 'The columns to be displayed.',
      type: 'array',
      schema: '/schemas/DataGridColumns.json',
      control: { type: 'GridColumns' },
    },
    rowIdField: {
      helperText:
        'Defines which column contains the [id](https://mui.com/x/react-data-grid/row-definition/#row-identifier) that uniquely identifies each row.',
      type: 'string',
      control: { type: 'RowIdFieldSelect' },
      label: 'Id field',
    },
    selection: {
      helperText: 'The currently selected row. Or `null` in case no row has been selected.',
      type: 'object',
      default: null,
      onChangeProp: 'onSelectionChange',
      tsType: `ThisComponent['rows'][number] | undefined`,
    },
    density: {
      helperText:
        'The [density](https://mui.com/x/react-data-grid/accessibility/#density-prop) of the rows. Possible values are `compact`, `standard`, or `comfortable`.',
      type: 'string',
      enum: ['compact', 'standard', 'comfortable'],
      default: 'compact',
    },
    height: {
      type: 'number',
      default: 350,
      minimum: 100,
    },
    loading: {
      helperText:
        "Displays a loading animation indicating the datagrid isn't ready to present data yet.",
      type: 'boolean',
    },
    hideToolbar: {
      helperText: 'Hide the toolbar area that contains the data grid user controls.',
      type: 'boolean',
    },
    sx: {
      helperText: SX_PROP_HELPER_TEXT,
      type: 'object',
    },
  },
});
