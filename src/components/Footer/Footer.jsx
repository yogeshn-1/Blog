import React from "react";
import { Logo } from "../index";
import fb from "../../assets/icons8-facebook.svg";
import ig from "../../assets/icons8-instagram.svg";
import x from "../../assets/icons8-twitterx.svg";

const Footer = () => {
  return (
    <section className="overflow-hidden py-4 bg-[#332f2f] mt-3 w-full">
      <div className="flex m-2 sm:flex-col xs:flex-col sm:text-sm xs:text-xs sm:text-center xs:text-center">
        <div className="xs:order-10 sm:order-10 p-2 mx-auto w-full flex-auto flex flex-col gap-2 items-center justify-center ">
          <Logo width="100px" />
          <span className="text-xs">&copy; 2024 Blogger's Haven </span>
        </div>
        {/* <div className="w-fit mx-auto mt-1"> */}
        <ul className="cursor-pointer mx-auto w-full flex-auto">
          <b>Get to Know Us</b>
          <li className="hover:underline">About Us</li>
          <li className="hover:underline">Contact Us</li>
          <li className="hover:underline">Stories</li>
        </ul>
        {/* </div> */}
        {/* <div className="w-fit mx-auto mt-1"> */}
        <ul className="cursor-pointer mx-auto w-full flex-auto">
          <b>Help</b>
          <li className="hover:underline">Your Account</li>
          <li className="hover:underline">FAQ</li>
          <li className="hover:underline">Report </li>
        </ul>
        {/* </div> */}
        {/* <div className="w-fit mx-auto mt-1"> */}
        <ul className="cursor-pointer mx-auto w-full flex-auto">
          <b>Connect With Us</b>
          <span className="flex sm:justify-center xs:justify-center gap-1">
            <img src={fb} className="sm:w-[25px] xs:w-[20px]" alt="" />
            <img src={ig} className="sm:w-[25px] xs:w-[20px]" alt="" />
            <img src={x} className="sm:w-[25px] xs:w-[20px]" alt="" />
          </span>
        </ul>
        {/* </div> */}
      </div>
    </section>
  );
};

export default Footer;
