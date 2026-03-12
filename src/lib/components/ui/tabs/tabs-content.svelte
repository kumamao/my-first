<script lang="ts">
  import { cn } from '$lib/utils';
  import { Tabs, type TabsContentProps } from '$lib/headless';

  let { class: className, ...props }: TabsContentProps = $props();
</script>

<Tabs.Content data-slot="tabs-content" class={cn('flex-1 outline-none', className)} {...props} />
