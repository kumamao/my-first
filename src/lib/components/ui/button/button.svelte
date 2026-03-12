<script lang="ts">
  import { Primitive, type PrimitiveProps } from '$lib/headless';
  import { cn } from '$lib/utils';
  import { buttonVariants, type ButtonVariants } from '.';

  interface ButtonProps extends ButtonVariants, PrimitiveProps<'button'> {}

  let { class: className, size, variant, ...props }: ButtonProps = $props();
</script>

<Primitive.button as="button" class={cn(buttonVariants({ variant, size }), className)} {...props} />
