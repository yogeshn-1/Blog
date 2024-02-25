import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className={`w-full my-2`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`rounded-md focus:border border-stone-700 ${className}`}
        {...props}
      >
        {options &&
          options?.map((option) => (
            <option className="p-0.5 text-sm" key={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
