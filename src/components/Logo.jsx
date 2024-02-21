import React from "react";
import logoImage from "../assets/yogi-high-resolution-logo-transparent.png";

const Logo = ({ width = "50px" }) => {
  return (
    <div className="rounded-sm" style={{ width: width }}>
      <img src={logoImage} />
    </div>
  );
};

export default Logo;
