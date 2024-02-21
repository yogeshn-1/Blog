import React from "react";

const Container = ({ children, bgColor = "" }) => {
  return (
    <div className={`w-full mx-auto max-w-7xl p-2 ${bgColor}`}>{children}</div>
  );
};

export default Container;
