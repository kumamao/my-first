<script lang="ts">
  import { TabsContent } from '$lib/components/ui/tabs';

  let { ...props }: SvelteComponentProps<typeof TabsContent> = $props();
</script>

<TabsContent
  class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6"
  {...props}
/>
