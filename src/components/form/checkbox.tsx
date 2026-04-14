import { cn } from "@/styles/utils";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import type { ChangeEvent } from "react";

interface CheckboxProps {
  id: string;
  label: string;
  name: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  id,
  label,
  name,
  value,
  onChange,
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-secondary text-sm font-medium"
    >
      <BaseCheckbox.Root
        id={id}
        checked={value}
        name={name}
        onCheckedChange={(checked) =>
          onChange({ target: { checked } } as ChangeEvent<HTMLInputElement>)
        }
        className={cn(
          "cursor-pointer flex size-5 items-center justify-center rounded-sm",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800",
          "data-checked:bg-primary-orange data-unchecked:border data-unchecked:border-gray-300 shadow-sm",
        )}
      >
        <BaseCheckbox.Indicator className="flex text-white data-unchecked:hidden">
          <CheckIcon className="size-4" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </label>
  );
};
