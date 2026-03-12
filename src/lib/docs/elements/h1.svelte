<script lang="ts">
	let { children } = $props();
</script>

<h1 class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
	{@render children?.()}
</h1>
