import { baseInputStyles } from "@/components/form/base.styles";
import { cn } from "@/styles/utils";
import type { ChangeEvent, KeyboardEvent } from "react";

interface TextInputProps {
  id: string;
  label?: string;
  name: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  type?: "text" | "email" | "password" | "textarea";
  error?: string | null;
  className?: string;
}

export const TextInput = ({
  id,
  label,
  name,
  value,
  disabled,
  placeholder,
  onChange,
  onKeyDown,
  type = "text",
  required = false,
  error,
  className,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-secondary">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(baseInputStyles, "min-h-[120px] resize-y", className)}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(baseInputStyles, className)}
          autoComplete="on"
          disabled={disabled}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
