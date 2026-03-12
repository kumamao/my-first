<script lang="ts">
	import { Primitive, type PrimitiveProps } from 'radix-ui';
	import { cn } from '$lib/utils';

	let { class: className, ...props }: PrimitiveProps<'div'> = $props();
</script>

<Primitive.div
	class={cn(
		"flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...props}
/>
