<script lang="ts">
  let { children } = $props();
</script>

<code
  class="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none"
>
  {@render children?.()}
</code>
