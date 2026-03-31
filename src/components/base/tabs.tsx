import { cn } from "@/styles/utils";
import { Tabs as TabsBase } from "@base-ui/react/tabs";

export const Tabs = (props: React.ComponentProps<typeof TabsBase.Root>) => {
  return <TabsBase.Root {...props} defaultValue={props.defaultValue} />;
};

export const TabsList = (
  props: React.ComponentProps<typeof TabsBase.List> & {
    indicatorClassName?: string;
  },
) => {
  return (
    <TabsBase.List
      className="relative z-0 flex px-1 text-white bg-gray-50 rounded-lg"
      {...props}
    >
      <TabsBase.Indicator
        className={cn(
          "absolute top-1/2 left-0 z-[-1] w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2",
          "rounded-sm transition-all duration-200 ease-in-out",
          props.indicatorClassName,
        )}
      />
      {props.children}
    </TabsBase.List>
  );
};

export const TabHeader = (props: React.ComponentProps<typeof TabsBase.Tab>) => {
  return (
    <TabsBase.Tab
      {...props}
      className={cn(
        "flex items-center justify-center border-0 px-2 md:px-3 py-1 md:py-2 m-1 rounded-[calc(var(--radius-lg)-1px)] text-base md:text-xl font-medium break-keep whitespace-nowrap text-secondary",
        "outline-hidden select-none before:inset-x-0 before:inset-y-1 before:rounded-xs before:-outline-offset-1 before:outline-primary-blue",
        "hover:text-black decoration-primary-orange data-active:bg-dark-blue data-active:text-white focus-visible:relative focus-visible:before:absolute focus-visible:before:outline",
        props.className,
      )}
    />
  );
};

export const TabsPanel = (
  props: React.ComponentProps<typeof TabsBase.Panel>,
) => {
  return (
    <TabsBase.Panel
      {...props}
      className="relative rounded-lg flex w-full -outline-offset-1 outline-primary-blue focus-visible:rounded-md focus-visible:outline-2"
    />
  );
};
