"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
function RegisterForm() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#999]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name="name"
            className="mb-4 rounded border border-gray-300 p-2 outline-[#3498DB] "
            placeholder=" Enter your name here"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="mb-4 rounded border border-gray-300 p-2 outline-[#3498DB] "
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="relative flex flex-col">
          <label
            className="mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="mb-4 rounded border border-gray-300 p-2 outline-[#3498DB] "
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[35%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>

        <div className="flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 "
          >
            Register Now
          </button>
        </div>
      </div>
    </form>
  );
}
export default RegisterForm;
