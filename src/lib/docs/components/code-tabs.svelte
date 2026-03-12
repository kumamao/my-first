<script lang="ts">
  import { Tabs } from '$lib/components/ui/tabs';

  let { ...props }: SvelteComponentProps<typeof Tabs> = $props();
</script>

<Tabs class="mt-6" defaultValue="cli" {...props} />
