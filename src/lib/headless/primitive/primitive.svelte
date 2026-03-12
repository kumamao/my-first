<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type { Component, Snippet } from 'svelte';
  import type { AsTag } from '.';
  import { useForwardExpose, type ComponentInstance } from '../shared';
  import { mergeProps } from 'bits-ui';

  export type PrimitiveProps = {
    as?: AsTag | Component<any, any, ''>;
    asChild?: Snippet<[props: { [x: string]: any }]> | true;
    children?: Snippet;
    defaultProps?: Record<string, any>;
    ref?: (value?: Element | ComponentInstance | null) => void;
  };

  let { as = 'div', asChild, children, defaultProps, ...props }: PrimitiveProps = $props();

  let As = as as Component<any, any, ''> | undefined;

  const mergedProps = $derived(defaultProps ? mergeProps(defaultProps, props) : props);

  const { el, currentRef } = useForwardExpose();

  $effect(() => {
    if (!asChild && typeof as === 'string') {
      mergedProps.ref?.(currentRef.value);
    }
  });

  export { el };
</script>

{#if asChild}
  {#if asChild !== true}
    {@render asChild?.(mergedProps)}
  {/if}
{:else if typeof as === 'string'}
  <svelte:element this={as} bind:this={currentRef.value} {...mergedProps}>
    {@render children?.()}
  </svelte:element>
{:else if As}
  <As {...mergedProps}>
    {@render children?.()}
  </As>
{/if}
