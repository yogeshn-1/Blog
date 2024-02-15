import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className={`w-full m-1 bg-orange-200`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`rounded-md bg-gray-400 ${className}`}
        {...props}
      >
        {options &&
          options?.map((option) => (
            <option
              className="p-0.5 text-sm bg-gray-500 text-white"
              key={option}
            >
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
