<script lang="ts">
	import { Badge } from '@/components/ui/badge';
	import { Button } from '@/components/ui/button';
	import { Spinner } from '@/components/ui/spinner';
</script>

<div class="flex items-center gap-6">
	<Spinner class="size-3" />
	<Spinner class="size-4" />
	<Spinner class="size-6" />
	<Spinner class="size-8" />
</div>

<div class="flex items-center gap-6">
	<Spinner class="size-6 text-red-500" />
	<Spinner class="size-6 text-green-500" />
	<Spinner class="size-6 text-blue-500" />
	<Spinner class="size-6 text-yellow-500" />
	<Spinner class="size-6 text-purple-500" />
</div>

<div class="flex flex-col items-center gap-4">
	<Button disabled size="sm">
		<Spinner />
		Loading...
	</Button>
	<Button variant="outline" disabled size="sm">
		<Spinner />
		Please wait
	</Button>
	<Button variant="secondary" disabled size="sm">
		<Spinner />
		Processing
	</Button>
</div>

<div class="flex items-center gap-4 [--radius:1.2rem]">
	<Badge>
		<Spinner />
		Syncing
	</Badge>
	<Badge variant="secondary">
		<Spinner />
		Updating
	</Badge>
	<Badge variant="outline">
		<Spinner />
		Processing
	</Badge>
</div>
