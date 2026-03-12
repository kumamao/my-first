<script lang="ts" module>
  import { type Snippet } from 'svelte';
  import type { DataOrientation, Direction, StringOrNumber } from '../shared/types';
  import type { PrimitiveProps } from '../primitive';
  import { createContext, useDirection, useId } from '../shared';

  export interface TabsRootContext {
    value?: StringOrNumber;
    // changeModelValue: (value: StringOrNumber) => void;
    orientation: DataOrientation;
    dir: Direction;
    unmountOnHide: boolean;
    activationMode: 'automatic' | 'manual';
    baseId: string;
    tabsList?: HTMLElement;
  }

  export interface TabsRootProps<T extends StringOrNumber = StringOrNumber>
    extends Omit<PrimitiveProps<'div'>, 'children'> {
    children?: Snippet<
      [
        props: {
          /** Current input values */
          value?: T;
        }
      ]
    >;

    /**
     * The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs
     */
    defaultValue?: T;
    /**
     * The orientation the tabs are laid out.
     * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
     * @defaultValue horizontal
     */
    orientation?: DataOrientation;
    /**
     * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
     */
    dir?: Direction;
    /**
     * Whether a tab is activated automatically (on focus) or manually (on click).
     * @defaultValue automatic
     */
    activationMode?: 'automatic' | 'manual';
    /** The controlled value of the tab to activate. Can be bind as `v-model`. */
    value?: T;
    /**
     * When `true`, the element will be unmounted on closed state.
     *
     * @defaultValue `true`
     */
    unmountOnHide?: boolean;

    /** Event handler called when the value changes */
    onValueChange?: (payload?: T) => void;
  }

  export const [getTabsRootContext, setTabsRootContext] = createContext<TabsRootContext>('Tabs');
</script>

<script lang="ts" generics="T extends StringOrNumber = StringOrNumber">
  import { Primitive } from '../primitive';

  let {
    activationMode = 'automatic',
    children,
    defaultValue,
    dir: propDir,
    value = $bindable(),
    onValueChange,
    orientation = 'horizontal',
    unmountOnHide = true,
    ...props
  }: TabsRootProps<T> = $props();

  const dir = useDirection(() => propDir);
  // useForwardExpose();

  setTabsRootContext({
    get value() {
      return value ?? defaultValue;
    },
    set value(v) {
      value = v;
      onValueChange?.(v);
    },
    get orientation() {
      return orientation;
    },
    get dir() {
      return dir?.value;
    },
    get unmountOnHide() {
      return unmountOnHide;
    },
    activationMode,
    baseId: useId(undefined, 'reka-tabs'),
    tabsList: undefined
  });
</script>

<Primitive.div dir={dir.value} data-orientation={orientation} {...props}>
  {@render children?.({ value })}
</Primitive.div>
