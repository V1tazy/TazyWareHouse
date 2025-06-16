"use client"


export interface StringArraySelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function StringArraySelect({
  options,
  value,
  onChange,
  placeholder,
}: StringArraySelectProps) {
  return (
    <select
      className="w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}