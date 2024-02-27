import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";
const Header = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      url: "/add-posts",
      active: authStatus,
    },
  ];
  return (
    <header className="p-1 bg-[#1A1A1B] text-white w-full sticky top-0 z-10">
      <nav className="flex justify-between">
        <div className="mx-1">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        <ul className="flex gap-1 justify-end items-center">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  className="rounded-full px-2 py-0.5 bg-transparent hover:bg-teal-200 hover:text-black duration-200"
                  onClick={() => navigate(item.url)}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
