<script lang="ts" module>
  import type { PrimitiveProps } from '../primitive';

  export interface TabsListProps extends PrimitiveProps<'div'> {
    /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
    loop?: boolean;
  }
</script>

<script lang="ts">
  import { Primitive } from '../primitive';
  import { RovingFocusGroup } from '../roving-focus';
  import { getTabsRootContext } from './tabs-root.svelte';

  let { loop = true, ...props }: TabsListProps = $props();
  // const { loop } = toRefs(props)

  const context = getTabsRootContext('TabsList');
</script>

<RovingFocusGroup orientation={context.orientation} dir={context.dir} {loop}>
  {#snippet asChild(rfgProps)}
    <Primitive.div
      {...rfgProps}
      {...props}
      ref={(ref) => (context.tabsList = ref)}
      role="tablist"
      aria-orientation={context.orientation}
    />
  {/snippet}
</RovingFocusGroup>
