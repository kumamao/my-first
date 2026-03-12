<script lang="ts">
import { Button } from "$lib/components/ui/button";
import { ArrowUpIcon } from "@lucide/svelte";
</script>

<div class="flex gap-2">
  <Button class="rounded-full">Get Started</Button>
  <Button variant="outline" size="icon" class="rounded-full">
    <ArrowUpIcon />
  </Button>
</div>