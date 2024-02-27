import React from "react";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <button
      className="mx-2 rounded-md px-2 py-0.5 bg-[#ec6b4f] hover:bg-[#f84d4d] hover:scale-105 duration-200"
      onClick={onLogout}
    >
      Logout{" "}
    </button>
  );
};

export default LogoutBtn;
