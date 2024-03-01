import React, { useEffect } from "react";
import svgimg1 from "../assets/3585160_66117.svg";
import svgimg from "../assets/4911346_2517864.svg";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-y-10 gap-x-5 px-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 text-black">
        <section
          data-aos="fade-right"
          data-aos-duration="1000"
          className="font-mono text-lg sm:text-base xs:text-sm "
        >
          Welcome to Blogger's Haven, where curiosity meets inspiration! Here,
          we embark on a journey of discovery, exploring topics that ignite our
          passions and spark our imaginations. Whether you're seeking insightful
          articles on technology, captivating stories about travel, or practical
          tips for personal development, you've come to the right place. At
          Blogger's Haven, we believe in the power of knowledge to transform
          lives and enrich experiences.{" "}
        </section>
        <picture
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" bg-white mx-auto w-full rounded-xl md:w-3/4 sm:w-2/3 "
        >
          <img
            data-aos="zoom-in"
            src={svgimg}
            alt=""
            className="w-[350px] mx-auto my-2 "
          />
        </picture>
        <picture
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" bg-white w-full rounded-xl mx-auto md:order-2 sm:order-2 xs:order-2 md:w-3/4 sm:w-3/4"
        >
          <img src={svgimg1} alt="" className="w-[350px] mx-auto  my-2 " />
        </picture>
        <section
          data-aos="fade-left"
          data-aos-duration="1000"
          className="font-mono w-fit text-lg sm:text-base xs:text-sm "
        >
          Here, we believe in the power of stories, the magic of knowledge, and
          the joy of exploration. Whether you're a seasoned adventurer seeking
          inspiration or a curious soul embarking on a new journey, you've found
          your digital haven. So, sit back, relax, and let the adventure begin.
          Join us as we navigate the realms of creativity, knowledge, and
          inspiration together. Welcome aboard!"
        </section>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="group mt-3 text-center p-2 rounded-md"
        style={{
          background: "linear-gradient( 135deg, #F05F57 10%, #360940 100%)",
        }}
      >
        {" "}
        <Link to="/login">
          <h1 className="text-5xl font-semibold font-mono sm:text-4xl xs:text-3xl">
            Get started{" "}
            <p className="inline-block group-hover:translate-x-3 duration-200">
              --&gt;
            </p>
          </h1>
        </Link>
      </div>
    </section>
  );
};

export default Welcome;
