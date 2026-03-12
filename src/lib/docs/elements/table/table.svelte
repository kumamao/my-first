<script lang="ts">
  let { children } = $props();
</script>

<div class="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
  <table
    class="relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0"
  >
    {@render children?.()}
  </table>
</div>
