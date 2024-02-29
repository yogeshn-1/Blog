import React from "react";
import logoImage from "../assets/bloggers-haven-high-resolution-logo-transparent.png";

const Logo = ({ width = "70px" }) => {
  return (
    <div className={`rounded-full w-[100px] sm:w-[70px] xs:w-[50px]`}>
      <img src={logoImage} style={{ width: width }} />
    </div>
  );
};

export default Logo;
