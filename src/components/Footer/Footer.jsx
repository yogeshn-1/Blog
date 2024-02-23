import React from "react";
import { Link } from "react-router-dom";
import { Logo, Container } from "../index";

const Footer = () => {
  return (
    <section className="overflow-hidden py-5 bg-[#332f2f] mt-3 w-full">
      <div className="flex justify-between m-2">
        <div>
          <Logo />
        </div>
      </div>
    </section>
  );
};

export default Footer;
