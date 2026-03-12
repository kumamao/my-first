<script lang="ts">
  let { children } = $props();
</script>

<td
  class="px-4 py-2 text-left whitespace-nowrap [[align=center]]:text-center [[align=right]]:text-right"
>
  {@render children?.()}
</td>
