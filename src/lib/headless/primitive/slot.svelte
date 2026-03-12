<script lang="ts">
	interface Props {
		[x: string]: any;
	}

	let { children, ...props }: Props = $props();
</script>

{@render children?.(props)}
