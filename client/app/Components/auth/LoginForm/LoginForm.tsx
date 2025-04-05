"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.25rem] font-medium">
          {" "}
          Login to Your account{" "}
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[14px]  ">
          Don't have an Account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            {" "}
            Register Now{" "}
          </a>
        </p>

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
        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-blue-500 hover:underline"
          >
            Forgot password
          </a>
        </div>
        <div className="mt-2 flex">
          <button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 "
          >
            Login Now
          </button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
