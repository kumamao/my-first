<script lang="ts" module>
  import { Context } from 'runed';

  // Elements
  import h2 from '../elements/h2.svelte';
  import h3 from '../elements/h3.svelte';
  import p from '../elements/p.svelte';
  import { table, tr, th, td } from '../elements/table';
  import code from '../elements/code.svelte';

  // Components
  import ComponentPreview from '../components/component-preview.svelte';
  import ComponentSource from '../components/component-source.svelte';
  import Callout from '../components/callout.svelte';
  import CodeTabs from '../components/code-tabs.svelte';
  import TabsList from '../components/tabs-list.svelte';
  import TabsTrigger from '../components/tabs-trigger.svelte';
  import TabsContent from '../components/tabs-content.svelte';
  import Steps from '../components/steps.svelte';
  import Step from '../components/step.svelte';

  const _globalThis = globalThis as typeof globalThis & {
    ComponentPreview: typeof ComponentPreview;
    ComponentSource: typeof ComponentSource;
    Callout: typeof Callout;
    CodeTabs: typeof CodeTabs;
    TabsList: typeof TabsList;
    TabsTrigger: typeof TabsTrigger;
    TabsContent: typeof TabsContent;
    Steps: typeof Steps;
    Step: typeof Step;
  };

  _globalThis.ComponentPreview = ComponentPreview;
  _globalThis.ComponentSource = ComponentSource;
  _globalThis.Callout = Callout;
  _globalThis.CodeTabs = CodeTabs;
  _globalThis.TabsList = TabsList;
  _globalThis.TabsTrigger = TabsTrigger;
  _globalThis.TabsContent = TabsContent;
  _globalThis.Steps = Steps;
  _globalThis.Step = Step;

  export { h2, h3, p, table, tr, th, td, code };

  type ComponentsContext = { packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun' };

  export const componentsContext = new Context<ComponentsContext>('docs/components');
</script>

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';

  let { children, title, description } = $props();

  const context = $state<ComponentsContext>({ packageManager: 'npm' });

  componentsContext.set(context);
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-start justify-between">
    <h1 class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
      {title}
    </h1>
    <div
      class="docs-nav fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t border-border/50 bg-background/80 px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none"
    >
      <Button class="md:size-7" size="icon" variant="secondary">
        {#snippet asChild(props)}
          <a {...props} href="/docs/components/">
            <ArrowLeft />
          </a>
        {/snippet}
      </Button>
      <Button class="md:size-7" size="icon" variant="secondary">
        {#snippet asChild(props)}
          <a {...props} href="/docs/components/">
            <ArrowRight />
          </a>
        {/snippet}
      </Button>
    </div>
  </div>

  <p class="text-[1.05rem] text-balance text-muted-foreground sm:text-base">
    {description}
  </p>
</div>

<div class="w-full flex-1 *:data-[slot=alert]:first:mt-0">
  {@render children?.()}
</div>
