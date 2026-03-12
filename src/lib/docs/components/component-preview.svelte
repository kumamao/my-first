<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import SiTypescript from '@icons-pack/svelte-simple-icons/icons/SiTypescript';
  import SiSvelte from '@icons-pack/svelte-simple-icons/icons/SiSvelte';
  import SiCss from '@icons-pack/svelte-simple-icons/icons/SiCss';
  import { IconCopy, IconTerminal } from '@tabler/icons-svelte';
  import { Button } from '$lib/components/ui/button';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { componentsContext } from '../layouts/index.svelte';

  import {
    LanguageSelector,
    setTranslations,
    type TranslationsContext
  } from '$lib/components/language-selector';

  let {
    children,
    class: className,
    code,
    codestr,
    innerClass,
    lang,
    name,
    title,
    ...props
  }: {
    children?: Snippet<[installation?: Snippet]>;
    class?: ClassValue;
    code?: Snippet;
    codestr?: string;
    innerClass?: string;
    lang: 'ts' | 'svelte' | 'bash' | 'css';
    name?: string;
    title?: string;
  } = $props();

  const t = $state<TranslationsContext>({
    language: 'en',
    translations: null
  });

  setTranslations(t);

  const icons = {
    bash: IconTerminal,
    ts: SiTypescript,
    svelte: SiSvelte,
    css: SiCss
  };

  const LangIcon = $derived(icons[lang]);

  const bashCodes = $derived.by<{ [x: string]: string | undefined }>(() => {
    if (!codestr) return {};
    const code = decodeURIComponent(codestr);
    if (code.startsWith('npx')) {
      const pkg = code.split('npx ')[1];
      return {
        pnpm: `pnpm dlx ${pkg}`,
        npm: `npx ${pkg}`,
        yarn: `yarn ${pkg}`,
        bun: `bunx --bun ${pkg}`
      };
    }

    const pkg = code.split('npm install ')[1];
    return {
      pnpm: `pnpm add ${pkg}`,
      npm: `npm install ${pkg}`,
      yarn: `yarn add ${pkg}`,
      bun: `bun add ${pkg}`
    };
  });
  const context = componentsContext.get();
</script>

{#snippet figure(props: { class?: ClassValue; lang?: string } = {})}
  {#if lang === 'bash'}
    {#snippet installation()}
      <div class="overflow-x-auto whitespace-nowrap">
        <Tabs bind:value={context.packageManager} class="flex flex-col gap-0">
          <div class="flex items-center gap-2 border-b border-border/50 px-3 py-1">
            <div
              class="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70"
            >
              <LangIcon class="text-code size-3" />
            </div>
            <TabsList
              class="inline-flex h-9 w-fit items-center justify-center rounded-none bg-transparent p-0 text-muted-foreground"
            >
              {#each ['pnpm', 'npm', 'yarn', 'bun'] as tool}
                <TabsTrigger
                  class="h-7 border border-transparent pt-0.5 data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
                  value={tool}>{tool}</TabsTrigger
                >
              {/each}
            </TabsList>
          </div>
          <div class="no-scrollbar overflow-x-auto">
            {#each ['pnpm', 'npm', 'yarn', 'bun'] as tool}
              <TabsContent value={tool} class="mt-0 flex-1 px-4 py-3.5 outline-none">
                <pre><code class="relative font-mono text-sm leading-none"
                    >{bashCodes[tool] ?? ''}</code
                  ></pre>
              </TabsContent>
            {/each}
          </div>
        </Tabs>
      </div>
    {/snippet}
    <figure data-rehype-pretty-code-figure="" class={className} {...props}>
      {@render children?.(installation)}
    </figure>
  {:else}
    <div class="relative">
      <figure data-rehype-pretty-code-figure="" class={className} {...props}>
        <Button
          data-slot="copy-button"
          variant="secondary"
          size="icon"
          class={cn('bg-code absolute top-3 right-2 z-10 size-7', { 'top-2': title })}
        >
          <span class="sr-only">Copy</span>
          <IconCopy />
        </Button>
        {#if title && /.[^.]+$/.test(title)}
          <figcaption
            class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:fill-foreground [&_svg]:opacity-70"
            data-rehype-pretty-code-title
            data-language={lang}
            data-theme="github-dark github-light-default"
          >
            <LangIcon />
            {title}
          </figcaption>
        {/if}
        <div>
          {@render children?.()}
        </div>
      </figure>
    </div>
  {/if}
{/snippet}

{#if name}
  <div
    data-slot="component-preview"
    class={cn(
      'group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border',
      innerClass,
      className
    )}
    {...props}
  >
    {#if name.endsWith('Rtl')}
      <div class="flex h-16 items-center border-b px-4">
        <LanguageSelector />
      </div>
    {/if}
    <div data-slot="preview" dir="ltr">
      {#if code}
        <div
          data-align="center"
          class="preview relative flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0"
        >
          {@render code()}
        </div>
      {/if}
    </div>
    <div
      data-slot="code"
      class="overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t [&_pre]:max-h-72"
    >
      {#if name.endsWith('Rtl')}
        <div
          class="no-scrollbar bg-code relative z-10 overflow-x-auto border-t p-6 font-mono text-sm text-muted-foreground"
        >
          <pre>// You will notice this example uses dir and data-lang attributes.
// This is because this site is not RTL by default.
// In your application, you won't need these.</pre>
          <span>
            // See the <a class="underline underline-offset-4" href="/docs/rtl">RTL guide</a> for more
            information.
          </span>
        </div>
      {/if}
      {@render figure({ class: '[&>pre]:max-h-96' })}
    </div>
  </div>
{:else}
  {@render figure({ lang })}
{/if}
