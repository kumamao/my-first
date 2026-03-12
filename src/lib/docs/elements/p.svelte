<script lang="ts">
  let { children } = $props();
</script>

<p class="leading-relaxed not-first:mt-6">
  {@render children?.()}
</p>
