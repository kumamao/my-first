<script lang="ts">
  import { TabsList } from '$lib/components/ui/tabs';

  let { ...props }: SvelteComponentProps<typeof TabsList> = $props();
</script>

<TabsList class="gap-4 rounded-none bg-transparent px-0" {...props} />
