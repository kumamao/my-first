<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '$lib/components/ui/button-group';
</script>

<ButtonGroup>
	<Button>Button 1</Button>
	<Button>Button 2</Button>
</ButtonGroup>

<ButtonGroup aria-label="Button group">
	<Button>Button 1</Button>
	<Button>Button 2</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical" aria-label="Media controls" class="h-fit">
	<Button variant="outline" size="icon">
		<PlusIcon />
	</Button>
	<Button variant="outline" size="icon">
		<MinusIcon />
	</Button>
</ButtonGroup>

<div class="flex flex-col items-start gap-8">
	<ButtonGroup>
		<Button variant="outline" size="sm">Small</Button>
		<Button variant="outline" size="sm">Button</Button>
		<Button variant="outline" size="sm">Group</Button>
		<Button variant="outline" size="icon-sm">
			<PlusIcon />
		</Button>
	</ButtonGroup>
	<ButtonGroup>
		<Button variant="outline">Default</Button>
		<Button variant="outline">Button</Button>
		<Button variant="outline">Group</Button>
		<Button variant="outline" size="icon">
			<PlusIcon />
		</Button>
	</ButtonGroup>
	<ButtonGroup>
		<Button variant="outline" size="lg">Large</Button>
		<Button variant="outline" size="lg">Button</Button>
		<Button variant="outline" size="lg">Group</Button>
		<Button variant="outline" size="icon-lg">
			<PlusIcon />
		</Button>
	</ButtonGroup>
</div>

<ButtonGroup>
	<ButtonGroup>
		<Button variant="outline" size="sm">1</Button>
		<Button variant="outline" size="sm">2</Button>
		<Button variant="outline" size="sm">3</Button>
		<Button variant="outline" size="sm">4</Button>
		<Button variant="outline" size="sm">5</Button>
	</ButtonGroup>
	<ButtonGroup>
		<Button variant="outline" size="icon-sm" aria-label="Previous">
			<ArrowLeftIcon />
		</Button>
		<Button variant="outline" size="icon-sm" aria-label="Next">
			<ArrowRightIcon />
		</Button>
	</ButtonGroup>
</ButtonGroup>

<ButtonGroup>
	<Button variant="secondary" size="sm">Copy</Button>
	<ButtonGroupSeparator />
	<Button variant="secondary" size="sm">Paste</Button>
</ButtonGroup>

<ButtonGroup>
	<Button variant="secondary">Button</Button>
	<ButtonGroupSeparator />
	<Button size="icon" variant="secondary">
		<PlusIcon />
	</Button>
</ButtonGroup>

<ButtonGroup>
	<ButtonGroupText>Text</ButtonGroupText>
	<Button>Button</Button>
</ButtonGroup>

<ButtonGroup>
	<ButtonGroupText>
		{#snippet asChild(props)}
			<label {...props} for="name">Text</label>
		{/snippet}
	</ButtonGroupText>
	<!-- <Input placeholder="Type something here..." id="name" /> -->
</ButtonGroup>
