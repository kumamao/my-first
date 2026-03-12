<script lang="ts">
import { ChevronsUpDown } from "@lucide/svelte"

import { Button } from "$lib/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "$lib/components/ui/collapsible"

let isOpen = $state(false)
</script>

<Collapsible
  open={isOpen}
  onOpenChange={(value) => isOpen = value}
  class="flex w-[350px] flex-col gap-2"
>
  <div class="flex items-center justify-between gap-4 px-4">
    <h4 class="text-sm font-semibold">
      @peduarte starred 3 repositories
    </h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon" class="size-8">
        <ChevronsUpDown />
        <span class="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  </div>
  <div class="rounded-md border px-4 py-2 font-mono text-sm">
    @radix-ui/primitives
  </div>
  <CollapsibleContent class="flex flex-col gap-2">
    <div class="rounded-md border px-4 py-2 font-mono text-sm">
      @radix-ui/colors
    </div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm">
      @stitches/react
    </div>
  </CollapsibleContent>
</Collapsible>