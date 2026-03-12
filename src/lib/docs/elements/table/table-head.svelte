<script lang="ts">
  let { children } = $props();
</script>

<th class="px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right">
  {@render children?.()}
</th>
