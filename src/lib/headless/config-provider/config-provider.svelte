<script lang="ts" module>
  import { getContext, hasContext, setContext, type Snippet } from 'svelte';
  import type { Direction } from '../shared';

  interface ConfigProviderContext {
    dir?: Direction;
  }

  const CONFIG_PROVIDER_CONTEXT = 'CONFIG_PROVIDER_CONTEXT';

  const getConfigProviderContext = <
    T extends ConfigProviderContext | null | undefined = ConfigProviderContext
  >(
    fallback?: T
  ): T extends null ? ConfigProviderContext | null : ConfigProviderContext => {
    let context;

    if (hasContext(CONFIG_PROVIDER_CONTEXT)) {
      context = getContext<T>(CONFIG_PROVIDER_CONTEXT);
    } else {
      context = fallback;
    }

    if (context) return context;
    if (context === null) return context as any;

    throw new Error(
      `Injection \`${CONFIG_PROVIDER_CONTEXT.toString()}\` not found. Component must be used within ${
        Array.isArray(CONFIG_PROVIDER_CONTEXT)
          ? `one of the following components: ${CONFIG_PROVIDER_CONTEXT.join(', ')}`
          : `\`${CONFIG_PROVIDER_CONTEXT}\``
      }`
    );
  };

  const setConfigProviderContext = (value: ConfigProviderContext) =>
    setContext(CONFIG_PROVIDER_CONTEXT, value);

  export { getConfigProviderContext, setConfigProviderContext };
</script>

<script lang="ts">
  let { children, dir = 'ltr' }: { children?: Snippet; dir?: Direction } = $props();

  setConfigProviderContext({
    get dir() {
      return dir;
    }
  });
</script>

{@render children?.()}
