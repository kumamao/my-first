<script lang="ts">
	let { children } = $props();
</script>

<h3 class="font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight">
	{@render children?.()}
</h3>
