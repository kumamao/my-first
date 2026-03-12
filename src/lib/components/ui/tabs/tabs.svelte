<script lang="ts">
  import { cn } from '$lib/utils';
  import { Tabs, type TabsRootProps } from '$lib/headless';

  let { class: className, value = $bindable(), ...props }: TabsRootProps = $props();
</script>

<Tabs.Root bind:value data-slot="tabs" class={cn('flex flex-col gap-2', className)} {...props} />
