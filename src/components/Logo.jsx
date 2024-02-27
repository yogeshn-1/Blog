import React from "react";
import logoImage from "../assets/bloggers-haven-high-resolution-logo-transparent.png";

const Logo = ({ width = "70px" }) => {
  return (
    <div className="rounded-full" style={{ width: width }}>
      <img src={logoImage} />
    </div>
  );
};

export default Logo;
