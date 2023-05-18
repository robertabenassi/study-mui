import * as React from 'react';
import { createProvidedContext } from '@mui/toolpad-utils/react';
import { ToolpadComponents } from './types.js';
import { createToolpadComponentThatThrows } from './runtime.js';

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
