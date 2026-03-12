import { getContext, hasContext, setContext } from 'svelte';

export const createContext = <T>(componentName: string, defaultContext?: T) => {
  const get = (consumerName: string) => {
    if (!hasContext(componentName)) {
      throw new Error(`\`${consumerName}\` must be used within \`${componentName}\``);
    }
    return getContext<T>(componentName);
  };

  const set = (context: T) => {
    setContext(componentName, context ?? defaultContext);
  };

  return [get, set] as const;
};
