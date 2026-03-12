<script lang="ts">
  import { cn } from '$lib/utils';
  import { Tabs, type TabsIndicatorProps } from '$lib/headless';

  let { class: className, ...props }: TabsIndicatorProps = $props();
</script>

<Tabs.Indicator class={cn('flex flex-col gap-2', className)} {...props} />
