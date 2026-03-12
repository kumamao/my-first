<script lang="ts">
  let { children, icon } = $props();
</script>

<div
  data-slot="alert"
  class="relative mt-6 grid w-auto grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border bg-background px-4 py-3 text-sm text-foreground has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 md:-mx-1 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"
>
  {@render icon()}
  <div
    class="col-start-2 grid justify-items-start gap-1 text-sm text-card-foreground/80 [&_p]:leading-relaxed"
  >
    {@render children?.()}
  </div>
</div>
