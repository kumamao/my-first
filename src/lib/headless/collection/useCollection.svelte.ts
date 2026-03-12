import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

export { default as CollectionSlot } from './collection-slot.svelte';
export { default as CollectionItem } from './collection-item.svelte';

export interface CollectionContext<ItemData = object> {
  collectionRef?: HTMLElement;
  itemMap: Map<HTMLElement, { ref: HTMLElement; value?: unknown } & ItemData>;
}

export const ITEM_DATA_ATTR = 'data-radix-collection-item';

export const useCollection = <ItemData = object>(
  options: {
    key?: string;
    isProvider?: boolean;
  } = {}
) => {
  const { key = '', isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context: CollectionContext<ItemData>;

  if (isProvider) {
    const collectionRef = $state<HTMLElement>();
    const itemMap = new SvelteMap<HTMLElement, { ref: HTMLElement } & ItemData>();

    context = {
      collectionRef,
      itemMap
    } as CollectionContext<ItemData>;

    setContext(injectionKey, context);
  } else {
    context = getContext<CollectionContext<ItemData>>(injectionKey);
  }

  const getItems = (includeDisabledItem = false) => {
    const collectionRef = context.collectionRef;
    // console.log(9999, collectionRef);
    if (!collectionRef) return [];
    const orderedNodes = Array.from(collectionRef.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
    const items = Array.from(context.itemMap.values());
    const orderedItems = items.sort(
      (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
    );

    if (includeDisabledItem) return orderedItems;
    else return orderedItems.filter((i) => i.ref.dataset.disabled !== '');
  };

  return { context, getItems };
};
