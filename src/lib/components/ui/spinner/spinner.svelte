<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle, type IconProps } from '@lucide/svelte';

	let { class: className, ...props }: IconProps = $props();
</script>

<LoaderCircle
	role="status"
	aria-label="Loading"
	class={cn('size-4 animate-spin', className)}
	{...props}
/>
