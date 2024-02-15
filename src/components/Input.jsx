import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, { ref }) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block m-0.5 p-0.5" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`outline-none px-1 py-0.5 w-full ${className}`}
          ref={ref}
          {...props}
          htmlFor={id}
        ></input>
      </div>
    );
  }
);
export default Input;
