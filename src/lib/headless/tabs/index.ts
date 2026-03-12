import TabsRoot, { type TabsRootProps } from './tabs-root.svelte';
import TabsList, { type TabsListProps } from './tabs-list.svelte';
import TabsTrigger, { type TabsTriggerProps } from './tabs-trigger.svelte';
import TabsIndicator, { type TabsIndicatorProps } from './tabs-indicator.svelte';
import TabsContent, { type TabsContentProps } from './tabs-content.svelte';

export { TabsRoot, TabsList, TabsTrigger, TabsIndicator, TabsContent };

export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsIndicatorProps,
  TabsContentProps
};

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Indicator: TabsIndicator,
  Content: TabsContent
};
