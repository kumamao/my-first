/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from './reactivity.svelte';
import { browser } from '$app/environment';
import type { ComponentInstance } from './types';

const unrefElement = <T extends Element | ComponentInstance | null | undefined>(
  ref: T | (() => T)
): Element | null | undefined => {
  if (!browser) return null;
  let r = ref;
  if (typeof r === 'function') r = r();
  if (r instanceof Element) return r;
  else if (r?.el) return r.el.value;
  return null;
};

export const useForwardExpose = <T extends ComponentInstance>() => {
  let currentRef = $state<Element | T | null>();
  // let el = $state<Element | null>();
  const currentElement = $derived<HTMLElement | null>(
    // @ts-expect-error ignore ts error
    ['#text', '#comment'].includes(currentRef?.el?.value.nodeName)
      ? // @ts-expect-error ignore ts error
        currentRef?.el.nextElementSibling
      : unrefElement(currentRef)
  );

  const forwardRef = (ref?: Element | T | null) => {
    currentRef = ref;

    // if (!ref) return;

    // el = ref instanceof Element ? ref : ref.el;
  };

  return {
    forwardRef,
    el: computed(() => {
      if (!currentRef) return;
      return currentRef instanceof Element ? currentRef : currentRef.el?.value;
    }),
    currentElement: computed(() => currentElement),
    currentRef: computed({ get: () => currentRef, set: (v) => (currentRef = v) })
  };
};
