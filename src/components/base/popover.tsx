import { ArrowSvg } from "@/components/icons/arrow.icon";
import { cn } from "@/styles/utils";
import { Popover as BasePopover } from "@base-ui/react/popover";

export function Popover({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof BasePopover.Root>) {
  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange} {...props} />
  );
}

export function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger {...props} />;
}

export function PopoverContent({
  side = "bottom",
  sideOffset = 8,
  collisionPadding = 5,
  children,
  className,
}: React.ComponentProps<
  typeof BasePopover.Popup & typeof BasePopover.Positioner
>) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <BasePopover.Popup
          className={cn(
            "origin-(--transform-origin) rounded-lg bg-[canvas] px-6 py-4 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
            className,
          )}
        >
          <BasePopover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
            <ArrowSvg />
          </BasePopover.Arrow>
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
