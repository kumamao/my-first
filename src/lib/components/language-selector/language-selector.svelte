<script lang="ts">
import * as Select from '$lib/components/ui/select/index.js';
  import { getTranslations } from './index.ts';

  const t = getTranslations();

  const translations = [
	{ value: 'en', label: 'English' },
	{ value: 'ar', label: 'Arabic (العربية)' },
	{ value: 'he', label: 'Hebrew (עברית)' }
];

const triggerContent = $derived(translations.find((f) => f.value === t.language)?.label ?? 'Select a fruit');
</script>

<!-- <div class="h-7x rounded-lg border border-border px-2 py-[3px] text-sm">
  <select class="pr-1 outline-0" bind:value={t.language}>
    <option value="en">English</option>
    <option value="ar">Arabic (العربية)</option>
    <option value="he">Hebrew (עברית)</option>
  </select>
</div> -->
<Select.Root type="single" name="favoriteFruit" bind:value={t.language}>
	<Select.Trigger class="w-[180px]">
	{triggerContent}
	</Select.Trigger>
	<Select.Content>
	<Select.Group>
		{#each translations as translation (translation.value)}
		<Select.Item value={translation.value} label={translation.label} disabled={translation.value === 'grapes'}>
			{translation.label}
		</Select.Item>
		{/each}
	</Select.Group>
	</Select.Content>
</Select.Root>
