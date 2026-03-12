<script lang="ts">
  import './docs.css';

  let { children } = $props();
</script>

<div
  class="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300"
>
  <div>
    {@render children()}
  </div>
</div>
