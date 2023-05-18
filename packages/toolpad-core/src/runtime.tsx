import * as React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Emitter } from '@mui/toolpad-utils/events';
import * as ReactIs from 'react-is';
import { hasOwnProperty } from '@mui/toolpad-utils/collections';
import { createProvidedContext } from '@mui/toolpad-utils/react';
import { RuntimeEvents, ToolpadComponents, ToolpadComponent, ArgTypeDefinition } from './types.js';
import { RUNTIME_PROP_NODE_ID, RUNTIME_PROP_SLOTS, TOOLPAD_COMPONENT } from './constants.js';
import type { SlotType, ComponentConfig, RuntimeEvent, RuntimeError } from './types.js';
import { createComponent } from './browser.js';

const ResetNodeErrorsKeyContext = React.createContext(0);

export const ResetNodeErrorsKeyProvider = ResetNodeErrorsKeyContext.Provider;

export type Components = ToolpadComponents;

export const ComponentsContext = React.createContext<ToolpadComponents | null>(null);

declare global {
  interface Window {
    __TOOLPAD_RUNTIME_EVENT__?: RuntimeEvent[] | ((event: RuntimeEvent) => void);
  }
}

export const NodeRuntimeContext = React.createContext<{
  nodeId: string | null;
  nodeName: string | null;
}>({
  nodeId: null,
  nodeName: null,
});
export const CanvasEventsContext = React.createContext<Emitter<RuntimeEvents>>(new Emitter());

// NOTE: These props aren't used, they are only there to transfer information from the
// React elements to the fibers.
interface SlotsWrapperProps {
  children?: React.ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  [RUNTIME_PROP_SLOTS]: string;
  // eslint-disable-next-line react/no-unused-prop-types
  slotType: SlotType;
  // eslint-disable-next-line react/no-unused-prop-types
  parentId: string;
}

function SlotsWrapper({ children }: SlotsWrapperProps) {
  return <React.Fragment>{children}</React.Fragment>;
}

interface PlaceholderWrapperProps {
  // eslint-disable-next-line react/no-unused-prop-types
  [RUNTIME_PROP_SLOTS]: string;
  // eslint-disable-next-line react/no-unused-prop-types
  parentId: string;
}

// We want typescript to enforce these props, even when they're not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PlaceholderWrapper(props: PlaceholderWrapperProps) {
  return (
    <div
      style={{
        minHeight: 72,
        minWidth: 200,
      }}
    />
  );
}

export interface NodeErrorProps {
  error: RuntimeError;
}

export interface NodeFiberHostProps {
  children: React.ReactElement;
  [RUNTIME_PROP_NODE_ID]: string;
  componentConfig: ComponentConfig<any>;
  nodeError?: RuntimeError | null;
}

// We will use [RUNTIME_PROP_NODE_ID] while walking the fibers to detect React Elements that
// represent AppDomNodes. We use a wrapper to ensure only one element exists in the React tree
// that has [RUNTIME_PROP_NODE_ID] property with this nodeId (We could clone the child and add
// the prop, but the child may be spreading its props to other elements). We also don't want this
// property to end up on DOM nodes.
// IMPORTANT! This node must directly wrap the React Element for the AppDomNode
function NodeFiberHost({ children }: NodeFiberHostProps) {
  return children;
}

export interface NodeRuntimeWrapperProps {
  children: React.ReactElement;
  nodeId: string;
  nodeName: string;
  componentConfig: ComponentConfig<any>;
  NodeError: React.ComponentType<NodeErrorProps>;
}

export function NodeRuntimeWrapper({
  nodeId,
  nodeName,
  componentConfig,
  children,
  NodeError,
}: NodeRuntimeWrapperProps) {
  const resetNodeErrorsKey = React.useContext(ResetNodeErrorsKeyContext);

  const ErrorFallback = React.useCallback(
    ({ error }: FallbackProps) => (
      <NodeFiberHost
        {...{
          [RUNTIME_PROP_NODE_ID]: nodeId,
          nodeError: error,
          componentConfig,
        }}
      >
        <NodeError error={error} />
      </NodeFiberHost>
    ),
    [NodeError, componentConfig, nodeId],
  );

  const nodeRuntimeValue = React.useMemo(() => ({ nodeId, nodeName }), [nodeId, nodeName]);

  return (
    <ErrorBoundary resetKeys={[resetNodeErrorsKey]} fallbackRender={ErrorFallback}>
      <NodeRuntimeContext.Provider value={nodeRuntimeValue}>
        <NodeFiberHost
          {...{
            [RUNTIME_PROP_NODE_ID]: nodeId,
            componentConfig,
          }}
        >
          {children}
        </NodeFiberHost>
      </NodeRuntimeContext.Provider>
    </ErrorBoundary>
  );
}

export interface NodeRuntime<P> {
  nodeId: string | null;
  nodeName: string | null;
  updateAppDomConstProp: <K extends keyof P & string>(
    key: K,
    value: React.SetStateAction<P[K]>,
  ) => void;
}

export function useNode<P = {}>(): NodeRuntime<P> | null {
  const { nodeId, nodeName } = React.useContext(NodeRuntimeContext);
  const canvasEvents = React.useContext(CanvasEventsContext);

  return React.useMemo(() => {
    if (!nodeId) {
      return null;
    }
    return {
      nodeId,
      nodeName,
      updateAppDomConstProp: (prop, value) => {
        canvasEvents.emit('propUpdated', {
          nodeId,
          prop,
          value,
        });
      },
    };
  }, [canvasEvents, nodeId, nodeName]);
}

export interface PlaceholderProps {
  prop: string;
  children?: React.ReactNode;
  hasLayout?: boolean;
}

export function Placeholder({ prop, children, hasLayout = false }: PlaceholderProps) {
  const { nodeId } = React.useContext(NodeRuntimeContext);
  if (!nodeId) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const count = React.Children.count(children);
  return count > 0 ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <PlaceholderWrapper
      parentId={nodeId}
      {...{
        [RUNTIME_PROP_SLOTS]: prop,
        slotType: hasLayout ? 'layout' : 'single',
      }}
    />
  );
}

export interface SlotsProps {
  prop: string;
  children?: React.ReactNode;
}

export function Slots({ prop, children }: SlotsProps) {
  const { nodeId } = React.useContext(NodeRuntimeContext);
  if (!nodeId) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const count = React.Children.count(children);
  return count > 0 ? (
    <SlotsWrapper
      parentId={nodeId}
      {...{
        [RUNTIME_PROP_SLOTS]: prop,
        slotType: 'multiple',
      }}
    >
      {children}
    </SlotsWrapper>
  ) : (
    <Placeholder prop={prop} />
  );
}

export function isToolpadComponent(
  maybeComponent: unknown,
): maybeComponent is ToolpadComponent<any> {
  if (
    !ReactIs.isValidElementType(maybeComponent) ||
    typeof maybeComponent === 'string' ||
    !hasOwnProperty(maybeComponent, TOOLPAD_COMPONENT)
  ) {
    return false;
  }

  return true;
}

export function getArgTypeDefaultValue<P extends object, K extends keyof P>(
  argType: ArgTypeDefinition<P, K>,
): P[K] | undefined {
  return argType.default ?? argType.defaultValue ?? undefined;
}

export function createToolpadComponentThatThrows(error: Error) {
  return createComponent(() => {
    throw error;
  });
}

const [useComponents, ComponentsContextProvider] =
  createProvidedContext<ToolpadComponents>('Components');

export { useComponents, ComponentsContextProvider };

export function useComponent(id: string) {
  const components = useComponents();
  return React.useMemo(() => {
    return (
      components?.[id] ??
      createToolpadComponentThatThrows(new Error(`Can't find component for "${id}"`))
    );
  }, [components, id]);
}
