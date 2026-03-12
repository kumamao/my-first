import { tick } from 'svelte';
import { browser } from '$app/environment';
import { defaultWindow } from '../shared';
import { FiniteStateMachine, watch } from 'runed';

export function usePresence(options: () => { present: boolean; node?: HTMLElement }) {
  const { present, node } = $derived(options());
  let stylesRef = $state<CSSStyleDeclaration>({} as CSSStyleDeclaration);
  let prevAnimationNameRef = $state<string>('none');
  const prevPresentRef = $state(present);
  const initialState = present ? 'mounted' : 'unmounted';
  let timeoutId: number | undefined;
  const ownerWindow = node?.ownerDocument.defaultView ?? defaultWindow;

  const fsm = new FiniteStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended'
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted'
    },
    unmounted: {
      MOUNT: 'mounted'
    }
  });
  // const stateMachine = useStateMachine(initialState, {
  //   mounted: {
  //     UNMOUNT: 'unmounted',
  //     ANIMATION_OUT: 'unmountSuspended'
  //   },
  //   unmountSuspended: {
  //     MOUNT: 'mounted',
  //     ANIMATION_END: 'unmounted'
  //   },
  //   unmounted: {
  //     MOUNT: 'mounted'
  //   }
  // });
  // const { state, dispatch } = $derived(stateMachine);

  const dispatchCustomEvent = (name: 'enter' | 'after-enter' | 'leave' | 'after-leave') => {
    // We only dispatch this event because CustomEvent is not available in Node18
    // https://github.com/unovue/reka-ui/issues/930
    if (browser) {
      const customEvent = new CustomEvent(name, { bubbles: false, cancelable: false });
      node?.dispatchEvent(customEvent);
    }
  };

  watch(
    () => present,
    (currentPresent, prevPresent) => {
      const hasPresentChanged = prevPresent !== currentPresent;

      tick().then(() => {
        if (hasPresentChanged) {
          const prevAnimationName = prevAnimationNameRef;
          const currentAnimationName = getAnimationName(node);

          if (currentPresent) {
            // dispatch('MOUNT');
            fsm.send('MOUNT');
            dispatchCustomEvent('enter');
            if (currentAnimationName === 'none') dispatchCustomEvent('after-enter');
          } else if (
            currentAnimationName === 'none' ||
            currentAnimationName === 'undefined' ||
            stylesRef?.display === 'none'
          ) {
            // If there is no exit animation or the element is hidden, animations won't run
            // so we unmount instantly rv
            // dispatch('UNMOUNT');
            if (fsm.current === 'mounted') fsm.send('UNMOUNT');
            dispatchCustomEvent('leave');
            dispatchCustomEvent('after-leave');
          } else {
            /**
             * When `present` changes to `false`, we check changes to animation-name to
             * determine whether an animation has started. We chose this approach (reading
             * computed styles) because there is no `animationrun` event and `animationstart`
             * fires after `animation-delay` has expired which would be too late.
             */
            const isAnimating = prevAnimationName !== currentAnimationName;
            if (prevPresent && isAnimating) {
              // dispatch('ANIMATION_OUT');
              fsm.send('ANIMATION_OUT');
              dispatchCustomEvent('leave');
            } else {
              // dispatch('UNMOUNT');
              fsm.send('UNMOUNT');
              dispatchCustomEvent('after-leave');
            }
          }
        }
      });
    }
  );

  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  const handleAnimationEnd = (event: AnimationEvent) => {
    const currentAnimationName = getAnimationName(node);
    const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
    const directionName = fsm.current === 'mounted' ? 'enter' : 'leave';
    if (event.target === node && isCurrentAnimation) {
      dispatchCustomEvent(`after-${directionName}`);
      // dispatch('ANIMATION_END');
      fsm.send('ANIMATION_END');

      if (!prevPresentRef) {
        const currentFillMode = node.style.animationFillMode;
        node.style.animationFillMode = 'forwards';
        // Reset the style after the node had time to unmount (for cases
        // where the component chooses not to unmount). Doing this any
        // sooner than `setTimeout` (e.g. with `requestAnimationFrame`)
        // still causes a flash.
        timeoutId = ownerWindow?.setTimeout(() => {
          if (node?.style.animationFillMode === 'forwards') {
            node.style.animationFillMode = currentFillMode;
          }
        });
      }
    }
    // if no animation, immediately trigger 'ANIMATION_END'
    if (event.target === node && currentAnimationName === 'none') fsm.send('ANIMATION_END'); // dispatch('ANIMATION_END');
  };
  const handleAnimationStart = (event: AnimationEvent) => {
    if (event.target === node) {
      // if animation occurred, store its name as the previous animation.
      prevAnimationNameRef = getAnimationName(node);
    }
  };

  watch(
    () => node,
    (newNode, oldNode) => {
      if (newNode) {
        stylesRef = getComputedStyle(newNode);
        newNode.addEventListener('animationstart', handleAnimationStart);
        newNode.addEventListener('animationcancel', handleAnimationEnd);
        newNode.addEventListener('animationend', handleAnimationEnd);
      } else {
        // Transition to the unmounted state if the node is removed prematurely.
        // We avoid doing so during cleanup as the node may change but still exist.
        // dispatch('ANIMATION_END');
        fsm.send('ANIMATION_END');

        if (timeoutId !== undefined) ownerWindow?.clearTimeout(timeoutId);
        oldNode?.removeEventListener('animationstart', handleAnimationStart);
        oldNode?.removeEventListener('animationcancel', handleAnimationEnd);
        oldNode?.removeEventListener('animationend', handleAnimationEnd);
      }
    }
  );

  watch(
    () => fsm.current,
    () => {
      const currentAnimationName = getAnimationName(node);
      prevAnimationNameRef = fsm.current === 'mounted' ? currentAnimationName : 'none';
    },
    {
      lazy: true
    }
  );

  const isPresent = $derived(['mounted', 'unmountSuspended'].includes(fsm.current));

  return {
    get isPresent() {
      return isPresent;
    }
  };
}

function getAnimationName(node?: HTMLElement) {
  return node ? getComputedStyle(node).animationName || 'none' : 'none';
}
