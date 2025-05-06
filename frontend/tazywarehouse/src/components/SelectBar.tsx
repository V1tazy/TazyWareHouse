"use client"


interface StringArraySelectProps {
    options: string[];
    value?: string;
    className?: string;
    disabled?: boolean;
  }
  
  export function StringArraySelect({
    options,
    value,
    className = "w-full",
    disabled = false,
  }: StringArraySelectProps) {
    return (
      <select
        className={className}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }