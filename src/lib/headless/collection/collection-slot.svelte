<script lang="ts" generics="ItemData = {}">
  import { Primitive, type PrimitiveProps } from '../primitive';
  import type { CollectionContext } from './useCollection.svelte';
  import type { Snippet } from 'svelte';

  let {
    context,
    ...props
  }: PrimitiveProps<'div'> & {
    asChild: Snippet<[props: { [x: string]: any }]>;
    context: CollectionContext<ItemData>;
  } = $props();
</script>

<Primitive.div {...props} ref={(value) => (context.collectionRef = value)} />
