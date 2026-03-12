<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { PrimitiveProps } from '../primitive';

  export interface PresenceProps extends Omit<PrimitiveProps<'div'>, 'children'> {
    children: Snippet<[opts: { present: boolean; ref: (ref?: HTMLElement) => void }]>;

    /**
     * Conditional to mount or unmount the child element. Similar to `v-if`
     *
     * @required true
     */
    present: boolean;
    /**
     * Force the element to render all the time.
     *
     * Useful for programmatically render grandchild component with the exposed `present`
     *
     * @defaultValue false
     */
    forceMount?: boolean;
  }
</script>

<script lang="ts">
  import { Primitive } from '../primitive';
  import { usePresence } from './usePresence.svelte';
  import { computed } from '../shared';

  let { children, present: propPresent, forceMount, ...props }: PresenceProps = $props();

  let node = $state<HTMLElement>();
  // Mount composables once to prevent duplicated eventListener
  const hookPresence = usePresence(() => ({ present: propPresent, node }));
  const { isPresent } = $derived(hookPresence);

  export const present = computed(() => isPresent);

  // export const get activeElement() {
  //   return isPresent;
  // };

  // let children = slots.default({ present: isPresent.value })
  // children = renderSlotFragments(children || [])
  // const instance = getCurrentInstance()

  // if (children && children?.length > 1) {
  //   const componentName = instance?.parent?.type.name
  //     ? `<${instance.parent.type.name} />`
  //     : 'component'

  //   throw new Error(
  //     [
  //       `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
  //       '',
  //       'Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
  //       'You can apply a few solutions:',
  //       [
  //         'Provide a single child element so that `presence` directive attach correctly.',
  //         'Ensure the first child is an actual element instead of a raw text node or comment node.',
  //       ]
  //         .map(line => `  - ${line}`)
  //         .join('\n'),
  //     ].join('\n'),
  //   )
  // }
</script>

{#if forceMount || propPresent || isPresent}
  <Primitive.div {...props}>
    {#snippet asChild()}
      {@render children({
        present: isPresent,
        ref(el) {
          if (typeof el?.hasAttribute === 'undefined') return el;

          // special case to handle animation for PopperContent
          if (el?.hasAttribute('data-reka-popper-content-wrapper'))
            node = el.firstElementChild as HTMLElement;
          else node = el;

          return el;
        }
      })}
    {/snippet}
  </Primitive.div>
{/if}
