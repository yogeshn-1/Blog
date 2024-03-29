import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { login as stateLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const login = async (data) => {
    validate();
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(stateLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  function validate() {
    if (errors?.email?.message) {
      toast.error(errors?.email?.message);
      return;
    }
    if (errors?.password?.message) {
      toast.error(errors?.password?.message);
      return;
    }
  }
  useEffect(() => {
    validate();
  }, [submitCount]);
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="flex items-center justify-center w-full  text-black"
    >
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 shadow-lg`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-primary transition-all duration-200 hover:underline text-[#fc6c4c]"
          >
            Sign Up
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-1 items-center px-6 py-2 mx-auto m-1 border-2 border-red-200 bg-amber-300/30 rounded-md"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email cannot be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "Password must be atleast 8 character",
              },
            })}
          />
          <Button
            type="submit"
            className="mt-2 w-20 text-white shadow-md bg-[#65b5ff] hover:bg-[#2496ff] duration-200 "
          >
            Login
          </Button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
