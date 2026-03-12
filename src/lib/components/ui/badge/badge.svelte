<script lang="ts">
  import { Primitive, type PrimitiveProps } from '$lib/headless';
  import { cn } from '$lib/utils';
  import { badgeVariants, type BadgeVariants } from '.';

  interface BadgeProps extends BadgeVariants, PrimitiveProps<'span'> {}

  let { class: className, variant, ...props }: BadgeProps = $props();
</script>

<Primitive.span as="span" class={cn(badgeVariants({ variant }), className)} {...props} />
