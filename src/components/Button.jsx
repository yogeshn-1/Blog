import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-teal-200",
  hoverBg = "hover:bg-teal-400",
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
