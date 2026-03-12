<script lang="ts" module>
  import type { PrimitiveProps } from '../primitive';
  // import { useForwardExpose } from '../shared';

  export interface CollapsibleTriggerProps extends PrimitiveProps<'button'> {}
</script>

<script lang="ts">
  import { boolAttr } from 'runed';
  import { Primitive } from '../primitive';
  import { collapsibleRootContext } from './collapsible-root.svelte';

  let { ...props }: CollapsibleTriggerProps = $props();

  // useForwardExpose();
  const rootContext = collapsibleRootContext.get();
</script>

<Primitive.button
  {...props}
  type="button"
  aria-controls={rootContext.contentId}
  aria-expanded={rootContext.open.value}
  data-state={rootContext.open.value ? 'open' : 'closed'}
  data-disabled={boolAttr(rootContext.disabled?.value)}
  disabled={rootContext.disabled?.value}
  onclick={rootContext.onOpenToggle}
/>
