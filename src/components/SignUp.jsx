import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth_service";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const createUser = async (data) => {
    setError("");
    try {
      const userCreated = await authService.createAccount(data);
      if (userCreated) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full  text-black">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 shadow-lg`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign-up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-primary transition-all duration-200 hover:underline text-[#4F90FF]"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-1 items-center px-6 py-2 mx-auto m-1 border-2 border-red-200 bg-amber-300/30 rounded-md"
        >
          <Input
            label="Name"
            type="text"
            placeholder="Enter your Name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="mt-2 w-24 text-white bg-orange-400 shadow-md hover:bg-[#fb6b1d] duration-200"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
