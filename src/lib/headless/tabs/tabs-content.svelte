<script lang="ts" module>
  import type { PrimitiveProps } from '../primitive';
  import type { StringOrNumber } from '../shared/types';
  // import { useForwardExpose } from '@/shared';

  export interface TabsContentProps extends PrimitiveProps<'div'> {
    /** A unique value that associates the content with a trigger. */
    value: StringOrNumber;
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with Vue animation libraries.
     */
    forceMount?: boolean;
  }
</script>

<script lang="ts">
  import { Presence } from '../presence';
  import { Primitive } from '../primitive';
  import { getTabsRootContext } from './tabs-root.svelte';
  import { makeContentId, makeTriggerId } from './utils';
  import { onMount } from 'svelte';

  let { children: propChildren, value, forceMount, ...props }: TabsContentProps = $props();

  // const { forwardRef } = useForwardExpose()
  const rootContext = getTabsRootContext('TabsContent');
  const triggerId = $derived(makeTriggerId(rootContext.baseId, value));
  const contentId = $derived(makeContentId(rootContext.baseId, value));

  const isSelected = $derived(value === rootContext.value);

  // svelte-ignore state_referenced_locally
  let isMountAnimationPreventedRef = $state(isSelected);

  onMount(() => {
    requestAnimationFrame(() => {
      isMountAnimationPreventedRef = false;
    });
  });
</script>

<Presence present={forceMount || isSelected} forceMount>
  {#snippet children({ present, ...presenceProps })}
    <Primitive.div
      {...presenceProps}
      {...props}
      id={contentId}
      role="tabpanel"
      data-state={isSelected ? 'active' : 'inactive'}
      data-orientation={rootContext.orientation}
      aria-labelledby={triggerId}
      hidden={!present}
      tabindex={0}
      style="animation-duration: {isMountAnimationPreventedRef ? '0s' : undefined}"
    >
      {#if rootContext.unmountOnHide ? present : true}
        {@render propChildren?.()}
      {/if}
    </Primitive.div>
  {/snippet}
</Presence>
