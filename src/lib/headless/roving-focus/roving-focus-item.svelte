<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import { Primitive, type PrimitiveProps } from '../primitive';
  import { CollectionItem, useCollection } from '../collection';
  import { getRovingFocusGroupContext } from './roving-focus-group.svelte';
  import { focusFirst, getFocusIntent, wrapArray, type Direction } from './utils';
  import { useId } from '../shared';

  export type RovingFocusItemProps = PrimitiveProps<'div'> & {
    active?: boolean;

    allowShiftKey?: boolean;

    dir?: Direction; // TOTo

    focusable?: boolean;

    loop?: boolean;

    tabStopId?: string;
  };

  let {
    active,
    allowShiftKey,
    dir,
    focusable = true,
    loop = true,
    tabStopId,
    ...props
  }: RovingFocusItemProps = $props();

  const context = getRovingFocusGroupContext();
  const randomId = useId();
  const id = $derived(tabStopId || randomId);
  const isCurrentTabStop = $derived(context.currentTabStopId === id);

  const { context: collectionContext, getItems } = useCollection();

  onMount(() => {
    if (focusable) context.onFocusableItemAdd();
  });
  onDestroy(() => {
    if (focusable) context.onFocusableItemRemove();
  });

  const onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && event.shiftKey) {
      context.onItemShiftTab();
      return;
    }

    if (event.target !== event.currentTarget) return;

    const focusIntent = getFocusIntent(event, context.orientation, context.dir);

    if (focusIntent !== undefined) {
      if (event.metaKey || event.ctrlKey || event.altKey || allowShiftKey ? false : event.shiftKey)
        return;

      event.preventDefault();
      let candidateNodes = [
        ...getItems()
          .map((i) => i.ref)
          .filter((i) => i.dataset.disabled !== '')
      ];

      if (focusIntent === 'last') {
        candidateNodes.reverse();
      } else if (focusIntent === 'prev' || focusIntent === 'next') {
        if (focusIntent === 'prev') candidateNodes.reverse();
        const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement);

        candidateNodes = context.loop
          ? wrapArray(candidateNodes, currentIndex + 1)
          : candidateNodes.slice(currentIndex + 1);
      }

      tick().then(() => focusFirst(candidateNodes));
    }
  };
</script>

<CollectionItem context={collectionContext}>
  {#snippet asChild(ciProps)}
    <Primitive.div
      {...ciProps}
      {...props}
      tabindex={isCurrentTabStop ? 0 : -1}
      data-active={active ? '' : undefined}
      data-orientation={context.orientation}
      onmousedown={(event) => {
        // We prevent focusing non-focusable items on `mousedown`.
        // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
        if (!focusable) event.preventDefault();
        // Safari doesn't focus a button when clicked so we run our logic on mousedown also
        else context.currentTabStopId = id;
      }}
      onfocus={() => (context.currentTabStopId = id)}
      {onkeydown}
    />
  {/snippet}
</CollectionItem>
