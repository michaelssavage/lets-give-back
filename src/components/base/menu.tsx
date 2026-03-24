import { ArrowSvg } from "@/components/icons/arrow.icon";
import { cn } from "@/styles/utils";
import { Menu as MenuBase } from "@base-ui/react/menu";
import { ChevronDownIcon } from "lucide-react";

export const Menu = ({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof MenuBase.Root>) => {
  return <MenuBase.Root open={open} onOpenChange={onOpenChange} {...props} />;
};

export const MenuTrigger = ({
  showIcon = true,
  openOnHover = false,
  className,
  ...props
}: React.ComponentProps<typeof MenuBase.Trigger> & {
  showIcon?: boolean;
}) => {
  return (
    <MenuBase.Trigger
      openOnHover={openOnHover}
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-xl border border-dark-blue bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-popup-open:text-black data-popup-open:bg-gray-100",
        className,
      )}
      {...props}
    >
      {props.children}
      {showIcon && <ChevronDownIcon className="-mr-1 shrink-0" />}
    </MenuBase.Trigger>
  );
};

export const MenuContent = ({
  alignOffset,
  sideOffset,
  collisionPadding = 5,
  side = "bottom",
  className,
  ...props
}: React.ComponentProps<
  typeof MenuBase.Popup & typeof MenuBase.Positioner
>) => {
  return (
    <MenuBase.Portal>
      <MenuBase.Positioner
        className="outline-hidden"
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <MenuBase.Popup
          className={cn(
            "origin-(--transform-origin) rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200",
            "transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
            className,
          )}
        >
          <MenuBase.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
            <ArrowSvg />
          </MenuBase.Arrow>

          {props.children}
        </MenuBase.Popup>
      </MenuBase.Positioner>
    </MenuBase.Portal>
  );
};

export const MenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof MenuBase.Item>) => {
  return (
    <MenuBase.Item
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-md bg-transparent px-2 py-1 text-sm font-semibold text-dark-blue transition select-none data-highlighted:bg-dark-blue data-highlighted:text-white",
        className,
      )}
      {...props}
    />
  );
};

export const MenuLinkItem = ({
  className,
  ...props
}: React.ComponentProps<typeof MenuBase.LinkItem>) => {
  return (
    <MenuBase.LinkItem
      className={cn(
        "flex cursor-default py-2 pr-8 pl-4 text-sm leading-4 outline-hidden select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-xs data-highlighted:before:bg-gray-900",
        className,
      )}
      {...props}
    />
  );
};

export const MenuSeparator = (
  props: React.ComponentProps<typeof MenuBase.Separator>,
) => {
  return <MenuBase.Separator {...props} />;
};
