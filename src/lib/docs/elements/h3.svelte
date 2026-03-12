<script lang="ts">
  let { children } = $props();
</script>

<h3
  class="font-heading mt-12 scroll-m-28 text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl"
>
  {@render children?.()}
</h3>
