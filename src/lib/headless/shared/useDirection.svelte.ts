import type { Direction } from './types';
import { getConfigProviderContext } from '$lib/headless/config-provider/config-provider.svelte';

/**
 * The `useDirection` function provides a way to access the current direction in your application.
 * @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
 * @returns  computed value that combines with the resolved direction.
 */
export function useDirection(getDir: () => Direction | undefined) {
  const context = getConfigProviderContext({
    dir: 'ltr'
  });

  const result = $derived(getDir() || context.dir || 'ltr');

  return {
    get value() {
      return result;
    }
  };
}
