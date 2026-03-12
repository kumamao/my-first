import { computed } from './reactivity.svelte';

export const useVModel = <T>(get: () => T, set: (v: T) => void, onChange?: (v: T) => void) => {
  return computed({
    get() {
      return get();
    },
    set(v: T) {
      set(v);
      onChange?.(v);
    }
  });
};

export const useBindable = <T>({
  get,
  set,
  default: defaultValue,
  onChange
}: {
  get: () => T | undefined;
  set: (v: T) => void;
  default?: T;
  onChange?: (v: T) => void;
}) => {
  return computed<T>({
    get() {
      return get() ?? defaultValue;
    },
    set(v: T) {
      set(v);
      onChange?.(v);
    }
  });
};
