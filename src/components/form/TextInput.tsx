import { baseInputStyles } from "@/components/form/base.styles";
import { cn } from "@/styles/utils";
import type { ChangeEvent } from "react";

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  placeholder,
  onChange,
  type = "text",
  required = false,
  error,
  className,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-secondary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(baseInputStyles, "min-h-[120px] resize-y", className)}
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
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(baseInputStyles, className)}
          autoComplete="on"
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
