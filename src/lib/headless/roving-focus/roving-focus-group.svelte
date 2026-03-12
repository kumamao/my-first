<script lang="ts" module>
  import { createContext } from 'svelte';

  interface RovingContext {
    dir?: Direction;
    orientation?: Orientation;
    loop?: boolean;
    currentTabStopId?: string | null;
    // onItemFocus: (tabStopId: string) => void;
    onItemShiftTab: () => void;
    onFocusableItemAdd: () => void;
    onFocusableItemRemove: () => void;
  }

  export const [getRovingFocusGroupContext, setRovingFocusGroupContext] =
    createContext<RovingContext>();
</script>

<script lang="ts">
  import { Primitive, type PrimitiveProps } from '../primitive';
  import { CollectionSlot, useCollection } from '../collection';
  import {
    ENTRY_FOCUS,
    EVENT_OPTIONS,
    focusFirst,
    type Direction,
    type Orientation
  } from './utils';
  import { on } from 'svelte/events';

  export type RovingFocusGroupProps = PrimitiveProps<'div'> & {
    /** The controlled value of the current stop item. Can be binded as `v-model`. */
    currentTabStopId?: string | null;

    /**
     * The value of the current stop item.
     *
     * Use when you do not need to control the state of the stop item.
     */
    defaultCurrentTabStopId?: string;

    onChangeCurrentTabStopId?: (value: string | null | undefined) => void;

    onEntryFocus?: (event: Event) => void;

    dir?: Direction;

    loop?: boolean;

    orientation?: Orientation;

    preventScrollOnEntryFocus?: boolean;
  };

  let {
    dir,
    loop,
    orientation,
    style,
    currentTabStopId = $bindable(),
    defaultCurrentTabStopId,
    onChangeCurrentTabStopId,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...props
  }: RovingFocusGroupProps = $props();

  const context = $state({
    currentTabStopId,
    dir,
    loop,
    orientation,
    onItemShiftTab() {
      isTabbingBackOut = true;
    },
    onFocusableItemAdd: () => {
      focusableItemsCount++;
    },
    onFocusableItemRemove: () => {
      focusableItemsCount--;
    }
  });

  setRovingFocusGroupContext(context);

  // let ref = $state<HTMLElement>();

  // let elements = $derived(ref?.children ? (Array.from(ref.children) as HTMLElement[]) : []);

  let current = $state<string | null | undefined>(currentTabStopId ?? defaultCurrentTabStopId);
  $effect(() => {
    current = currentTabStopId;
  });
  $effect(() => {
    currentTabStopId = current;
    onChangeCurrentTabStopId?.(current);
  });

  // let current = $state<number>(-1);

  let isTabbingBackOut = $state(false);
  let isClickFocus = $state(false);
  let focusableItemsCount = $state(0);

  const { context: collectionContext, getItems } = useCollection({ isProvider: true });

  // const getItems = () => {
  //   return elements;
  // };

  // $effect(() => {
  //   elements.forEach((element) => {
  //     element.setAttribute('data-radix-collection-item', '');
  //   });
  // });

  // $effect(() => {
  //   elements[current]?.focus();
  // });

  // $effect(() => {
  //   const disposes = elements.map((element, index) => {
  //     return on(element, 'focus', () => {
  //       current = index;
  //     });
  //   });

  //   return () => {
  //     disposes.forEach((dispose) => dispose());
  //   };
  // });

  // $effect(() => {
  //   let dispose: () => void;

  //   if (ref) {
  //     dispose = on(ref, 'keydown', (event) => {
  //       if (
  //         !orientation ||
  //         !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
  //       )
  //         return;

  //       let next = current;

  //       if (orientation === 'horizontal') {
  //         if (event.key === 'ArrowLeft') {
  //           // left
  //           next = current - 1;
  //         } else if (event.key === 'ArrowRight') {
  //           // right
  //           next = current + 1;
  //         }
  //       } else if (orientation === 'vertical') {
  //         if (event.key === 'ArrowUp') {
  //           // up
  //           next = current - 1;
  //         } else if (event.key === 'ArrowDown') {
  //           // down
  //           next = current += 1;
  //         }
  //       }

  //       if (loop) {
  //         if (next < 0) {
  //           current = elements.length - 1;
  //         } else if (next > elements.length - 1) {
  //           current = 0;
  //         } else {
  //           current = next;
  //         }
  //       } else {
  //         if (next < 0) {
  //           current = 0;
  //         } else if (next > elements.length - 1) {
  //           current = elements.length - 1;
  //         } else {
  //           current = next;
  //         }
  //       }
  //     });
  //   }

  //   return () => {
  //     if (ref) {
  //       dispose?.();
  //     }
  //   };
  // });

  const onmouseup = () => {
    setTimeout(() => {
      isClickFocus = false;
    }, 1);
  };

  const onfocus = (event: FocusEvent) => {
    const isKeyboardFocus = !isClickFocus;

    if (
      event.currentTarget &&
      event.currentTarget === event.target &&
      isKeyboardFocus &&
      !isTabbingBackOut
    ) {
      const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
      event.currentTarget.dispatchEvent(entryFocusEvent);
      onEntryFocus?.(entryFocusEvent);

      if (!entryFocusEvent.defaultPrevented) {
        const items = getItems()
          .map((i) => i.ref)
          .filter((i) => i.dataset.disabled !== '');
        const activeItem = items.find((item) => item.getAttribute('data-active') === '');
        const highlightedItem = items.find((item) => item.getAttribute('data-highlighted') === '');
        const currentItem = items.find((item) => item.id === currentTabStopId);
        const candidateItems = [activeItem, highlightedItem, currentItem, ...items].filter(
          Boolean
        ) as typeof items;
        focusFirst(candidateItems, preventScrollOnEntryFocus);
      }
    }

    isClickFocus = false;
  };
</script>

<CollectionSlot context={collectionContext}>
  {#snippet asChild(csProps)}
    <Primitive.div
      defaultProps={csProps}
      {...props}
      tabindex={isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0}
      data-orientation={orientation}
      {dir}
      style={[style, 'outline: none'].join(';')}
      onmousedown={() => (isClickFocus = true)}
      {onmouseup}
      {onfocus}
      onblur={() => (isTabbingBackOut = false)}
    />
  {/snippet}
</CollectionSlot>
