<script lang="ts" module>
  import { Context } from 'runed';
  import type { PrimitiveProps } from '../primitive';
  import { computed, useBindable, useForwardExpose, type Derived } from '../shared';

  export interface CollapsibleRootProps extends Omit<PrimitiveProps<'div'>, 'children'> {
    children?: (props: {
      /** Current open state */
      open?: boolean;
    }) => any;

    /** The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open state. */
    defaultOpen?: boolean;
    /** The controlled open state of the collapsible. Can be binded with `v-model`. */
    open?: boolean;
    /** When `true`, prevents the user from interacting with the collapsible. */
    disabled?: boolean;
    /** When `true`, the element will be unmounted on closed state. */
    unmountOnHide?: boolean;

    /** Event handler called when the open state of the collapsible changes. */
    onOpenChange: (value: boolean) => void;
  }

  interface CollapsibleRootContext {
    contentId: string;
    disabled: Derived<boolean | undefined>;
    open: Derived<boolean>;
    unmountOnHide: Derived<boolean>;
    onOpenToggle: () => void;
  }

  export const collapsibleRootContext = new Context<CollapsibleRootContext>('CollapsibleRoot');
</script>

<script lang="ts">
  import { Primitive } from '../primitive';

  let {
    children,
    disabled,
    open: _open = $bindable(),
    defaultOpen = false,
    unmountOnHide = true,
    onOpenChange,
    ...props
  }: CollapsibleRootProps = $props();

  // svelte-ignore non_reactive_update
  const open = useBindable({
    get: () => _open,
    set: (v) => (_open = v),
    default: defaultOpen,
    onChange: onOpenChange
  });

  const { el, currentRef } = useForwardExpose();

  collapsibleRootContext.set({
    contentId: '',
    disabled: computed(() => disabled),
    open,
    unmountOnHide: computed(() => unmountOnHide),
    onOpenToggle: () => {
      if (disabled) return;

      open.value = !open.value;
    }
  });

  $effect(() => {
    console.log(999, el.value);
  });

  export { el, open };
</script>

<Primitive.div
  bind:this={currentRef.value}
  {...props}
  data-state={open ? 'open' : 'closed'}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.({ open: open.value })}
</Primitive.div>
