<script lang="ts">
  import { cn } from '$lib/utils';
  import { buttonGroupVariants, type ButtonGroupVariants } from '.';

  interface ButtonGroupProps extends ButtonGroupVariants, SvelteElementAttributes<'div'> {
    orientation?: 'horizontal' | 'vertical';
  }

  let {
    children,
    class: className,
    orientation = 'horizontal',
    ...props
  }: ButtonGroupProps = $props();
</script>

<div
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={cn(buttonGroupVariants({ orientation }), className)}
  {...props}
>
  {@render children?.()}
</div>
