import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "",
  hoverBg = "",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-md px-2 py-1 ${bgColor} ${hoverBg} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
