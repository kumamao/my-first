// import { untrack } from 'svelte';

// export const watch = <T>(
//   target: () => T,
//   callback: (currentValue: T, prevValue?: T) => void | Promise<void>,
//   options: { immediate?: boolean } = { immediate: false }
// ) => {
//   let first = true;
//   let prevValue: T;

//   $effect(() => {
//     const currentValue = target();

//     if (!options.immediate && first) return;

//     untrack(() => {
//       callback(currentValue, prevValue);
//     });

//     return () => {
//       first = false;
//       prevValue = currentValue;
//     };
//   });
// };

// import { watch as _watch } from 'runed';

// type WatchArgs = Parameters<typeof _watch>;

// export const watch = (
//   source: WatchArgs[0],
//   effect: WatchArgs[1] | Promise<ReturnType<WatchArgs[1]>>,
//   options: WatchArgs[2]
// ): ReturnType<typeof _watch> => {
//   if (effect instanceof Promise) {
//     return _watch(source, (...args2: Parameters<typeof effect>) => effect(...args2), options);
//   }
//   return _watch(source, effect, options);
// };

const DerivedSymbol: unique symbol = Symbol('DerivedSymbol');

export type ReadonlyDerived<T> = {
  [DerivedSymbol]: true;
  readonly value: T;
};

export type Derived<T> = {
  [DerivedSymbol]: true;
  value: T;
};

export function computed<T>(srouce: () => T | undefined): ReadonlyDerived<T>;
export function computed<T>(srouce: {
  get: () => T | undefined;
  set: (value: T) => void;
}): Derived<T>;
export function computed<T>(srouce: (() => T) | { get: () => T; set: (value: T) => void }) {
  const readonly = typeof srouce === 'function';
  const value = $derived(readonly ? srouce() : srouce.get());

  if (readonly) {
    return {
      [DerivedSymbol]: true,
      get value() {
        return value;
      }
    };
  }

  return {
    [DerivedSymbol]: true,
    get value() {
      return value;
    },
    set value(v: T) {
      srouce.set(v);
    }
  };
}
