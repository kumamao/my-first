<script lang="ts">
import { Button } from "@/components/ui/button"
</script>

<Button>
  {#snippet asChild(props)}
    <a {...props} href="/login">Login</a>
  {/snippet}
</Button>