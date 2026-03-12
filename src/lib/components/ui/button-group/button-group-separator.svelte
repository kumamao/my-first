<script lang="ts">
	import { cn } from '$lib/utils';
	import { Separator, type SeparatorProps } from '../separator';

	interface ButtonGroupSeparatorProps extends SeparatorProps {
		orientation?: 'horizontal' | 'vertical';
	}

	let {
		class: className,
		orientation = 'vertical',
		...props
	}: ButtonGroupSeparatorProps = $props();
</script>

<Separator
	{orientation}
	class={cn('relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto', className)}
	{...props}
/>
