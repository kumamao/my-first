<script lang="ts" generics="ItemData = {}">
  import { Primitive, type PrimitiveProps } from '../primitive';
  import { ITEM_DATA_ATTR, type CollectionContext } from './useCollection.svelte';

  let {
    context,
    value,
    ...props
  }: PrimitiveProps<'div'> & { context: CollectionContext<ItemData>; value?: any } = $props();
</script>

<Primitive.div
  {...props}
  {...{ [ITEM_DATA_ATTR]: '' }}
  ref={(element) => {
    if (element) context.itemMap.set(element, { ref: element, value } as any);
  }}
/>
