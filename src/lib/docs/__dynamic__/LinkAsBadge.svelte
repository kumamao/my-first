<script lang="ts">
	import { Badge } from '@/components/ui/badge';
</script>

<Badge>
	{#snippet asChild(props)}
		<a {...props} href="/">Badge</a>
	{/snippet}
</Badge>