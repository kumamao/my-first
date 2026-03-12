<script lang="ts" module>
  import type { PrimitiveProps } from '../primitive';
  import type { StringOrNumber } from '../shared/types';
  // import { useForwardExpose } from '../shared';

  export interface TabsTriggerProps extends PrimitiveProps<'button'> {
    /** A unique value that associates the trigger with a content. */
    value: StringOrNumber;
    /** When `true`, prevents the user from interacting with the tab. */
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import { Primitive } from '../primitive';
  import { RovingFocusItem } from '../roving-focus';
  import { getTabsRootContext } from './tabs-root.svelte';
  import { makeContentId, makeTriggerId } from './utils';

  let { disabled = false, value, ...props }: TabsTriggerProps = $props();

  // const { forwardRef } = useForwardExpose();
  const rootContext = getTabsRootContext('TabsTrigger');

  const triggerId = $derived(makeTriggerId(rootContext.baseId, value));
  const contentId = $derived(makeContentId(rootContext.baseId, value));

  const isSelected = $derived(value === rootContext.value);
</script>

<RovingFocusItem focusable={!disabled} active={isSelected}>
  {#snippet asChild(rfiProps)}
    <Primitive.button
      {...rfiProps}
      {...props}
      id={triggerId}
      role="tab"
      type="button"
      as="button"
      aria-selected={isSelected ? 'true' : 'false'}
      aria-controls={contentId}
      data-state={isSelected ? 'active' : 'inactive'}
      {disabled}
      data-disabled={disabled ? '' : undefined}
      data-orientation={rootContext.orientation}
      onmousedown={(event) => {
        rfiProps.onmousedown?.(event);
        if (event.button === 0) {
          // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
          // but not when the control key is pressed (avoiding MacOS right click)
          if (!disabled && event.ctrlKey === false) {
            rootContext.value = value;
          } else {
            // prevent focus to avoid accidental activation
            event.preventDefault();
          }
        }
      }}
      onkeydown={(event) => {
        rfiProps.onkeydown?.(event);
        if (['Enter', 'NumpadEnter', 'Space'].includes(event.code)) {
          rootContext.value = value;
        }
      }}
      onfocus={(event) => {
        rfiProps.onfocus?.(event);
        // handle 'automatic' activation if necessary
        // ie. activate tab following focus
        const isAutomaticActivation = rootContext.activationMode !== 'manual';
        if (!isSelected && !disabled && isAutomaticActivation) {
          rootContext.value = value;
        }
      }}
    />
  {/snippet}
</RovingFocusItem>
