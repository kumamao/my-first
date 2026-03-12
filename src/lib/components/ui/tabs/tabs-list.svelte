<script lang="ts">
  import { cn } from '$lib/utils';
  import { Tabs, type TabsListProps } from '$lib/headless';

  let { class: className, ...props }: TabsListProps = $props();
</script>

<Tabs.List
  data-slot="tabs-list"
  class={cn(
    'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground',
    className
  )}
  {...props}
/>
