<script lang="ts">
  let { children } = $props();
</script>

<div class="[&>h3]:step steps mb-12 [counter-reset:step] *:[h3]:first:mt-0!">
  {@render children?.()}
</div>
