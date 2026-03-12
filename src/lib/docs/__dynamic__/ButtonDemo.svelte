<script lang="ts">
import { ArrowUpIcon } from "@lucide/svelte"

import { Button } from "$lib/components/ui/button"
</script>

<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <Button variant="outline">Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>