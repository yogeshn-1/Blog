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
      className="rounded-md px-2 py-0.5 bg-amber-300 hover:bg-amber-500"
      onClick={onLogout}
    >
      Logout{" "}
    </button>
  );
};

export default LogoutBtn;
