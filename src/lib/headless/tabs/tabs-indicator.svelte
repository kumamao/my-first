<script lang="ts">
  import { Primitive, type PrimitiveProps } from '../primitive';

  export type TabsIndicatorProps = PrimitiveProps<'div'>;

  let { ...props }: TabsIndicatorProps = $props();
</script>

<Primitive.div
  data-slot="tabs-indicator"
  --reka-tabs-indicator-size
  --reka-tabs-indicator-position
  {...props}
/>
