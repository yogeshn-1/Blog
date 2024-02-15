import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = " bg-blue-300",
  textColor = "white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-md px-2 py-1 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
