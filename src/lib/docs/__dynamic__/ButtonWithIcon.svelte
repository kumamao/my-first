<script lang="ts">
import { Button } from "@/components/ui/button";
import { IconGitBranch, IconGitFork } from "@tabler/icons-svelte";
</script>

<div class="flex gap-2">
  <Button variant="outline">
    <IconGitBranch data-icon="inline-start" /> New Branch
  </Button>
  <Button variant="outline">
    Fork
    <IconGitFork data-icon="inline-end" />
  </Button>
</div>