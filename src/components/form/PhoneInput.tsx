import { baseInputStyles } from "@/components/form/base.styles";
import { cn } from "@/styles/utils";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { useState, type ChangeEvent } from "react";

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange: (value: string, isValid: boolean) => void;
  required?: boolean;
  className?: string;
}

export const PhoneInput = ({
  id,
  label,
  name,
  placeholder,
  value = "",
  onChange,
  required = false,
  className,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = new AsYouType().input(rawValue);
    setInputValue(formattedValue);

    const phoneNumber = parsePhoneNumberFromString(formattedValue);
    if (phoneNumber && phoneNumber.isValid()) {
      setError("");
      onChange(phoneNumber.number, true);
    } else {
      setError("Invalid phone number");
      onChange(formattedValue, false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-secondary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type="tel"
        name={name}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        className={cn(
          baseInputStyles,
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
          className
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
