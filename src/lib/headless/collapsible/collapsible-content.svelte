<script lang="ts" module>
  import type { PrimitiveProps } from '../primitive';

  export interface CollapsibleContentProps extends PrimitiveProps<'div'> {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with Vue animation libraries.
     */
    forceMount?: boolean;

    onContentFound?: () => void;
  }
</script>

<script lang="ts">
  import { Presence } from '../presence';
  import { Primitive } from '../primitive';
  import { useForwardExpose, useId } from '../shared';
  import { collapsibleRootContext } from './collapsible-root.svelte';
  import { useEventListener, watch } from 'runed';
  import { onMount, tick } from 'svelte';

  let {
    children: propChildren,
    forceMount,
    onContentFound,
    ...props
  }: CollapsibleContentProps = $props();

  const rootContext = collapsibleRootContext.get();
  rootContext.contentId ||= useId(undefined, 'reka-collapsible-content');

  let presentRef = $state<ReturnType<typeof Presence>>();
  const { el, currentRef, currentElement } = useForwardExpose();

  let width = $state(0);
  let height = $state(0);

  // when opening we want it to immediately open to retrieve dimensions
  // when closing we delay `present` to retrieve dimensions before closing
  const isOpen = $derived(rootContext.open.value);
  // svelte-ignore state_referenced_locally
  let isMountAnimationPrevented = $state(isOpen);
  let currentStyle = $state<Record<string, string>>();

  watch([() => isOpen, () => presentRef?.present.value], () => {
    tick().then(() => {
      const node = currentElement.value;
      if (!node) return;
      currentStyle = currentStyle || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      // block any animations/transitions so the element renders at its full dimensions
      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      // get width and height from full dimensions
      const rect = node.getBoundingClientRect();
      height = rect.height;
      width = rect.width;

      // kick off any animations/transitions that were originally set up if it isn't the initial mount
      if (!isMountAnimationPrevented) {
        node.style.transitionDuration = currentStyle.transitionDuration;
        node.style.animationName = currentStyle.animationName;
      }
    });
  });

  const skipAnimation = $derived(isMountAnimationPrevented && rootContext.open.value);

  onMount(() => {
    requestAnimationFrame(() => {
      isMountAnimationPrevented = false;
    });
  });

  useEventListener(
    () => currentElement.value,
    'beforematch',
    () => {
      requestAnimationFrame(() => {
        rootContext.onOpenToggle();
        onContentFound?.();
      });
    }
  );

  export { el };
</script>

<Presence bind:this={presentRef} present={forceMount || rootContext.open.value} forceMount>
  {#snippet children({ present, ...presenceProps })}
    <Primitive.div
      bind:this={currentRef.value}
      {...props}
      defaultProps={presenceProps}
      id={rootContext.contentId}
      hidden={!present ? (rootContext.unmountOnHide.value ? '' : 'until-found') : undefined}
      data-state={skipAnimation ? undefined : rootContext.open.value ? 'open' : 'closed'}
      data-disabled={rootContext.disabled?.value ? '' : undefined}
      style={Object.entries({
        [`--reka-collapsible-content-height`]: `${height}px`,
        [`--reka-collapsible-content-width`]: `${width}px`
      })
        .map(([key, value]) => `${key}: ${value}`)
        .join(';')}
    >
      {#if rootContext.unmountOnHide.value ? present : true}
        {@render propChildren?.()}
      {/if}
    </Primitive.div>
  {/snippet}
</Presence>
