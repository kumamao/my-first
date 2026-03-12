<script lang="ts">
  import { getTranslations } from './index.ts';

  const t = getTranslations();
</script>

<div class="h-7x rounded-lg border border-border px-2 py-[3px] text-sm">
  <select class="pr-1 outline-0" bind:value={t.language}>
    <option value="en">English</option>
    <option value="ar">Arabic (العربية)</option>
    <option value="he">Hebrew (עברית)</option>
  </select>
</div>
