<script lang="ts">
  let { children } = $props();
</script>

<tr class="m-0 border-b">
  {@render children?.()}
</tr>
