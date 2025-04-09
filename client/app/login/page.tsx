"use client";
import React, { use, useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function page() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      router.push("/"); // Redirect to the home page if the user is already logged in
    }
  }, [user, router]);
  // return null or the loading screen

  if (user && user._id) {
    return null; // or a loading spinner
  }
  return (
    <div className="login-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default page;
