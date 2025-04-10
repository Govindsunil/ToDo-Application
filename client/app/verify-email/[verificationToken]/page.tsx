"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface PageProps {
  params: {
    verificationToken: string;
  };
}

function page({ params }: PageProps) {
  const { verificationToken } = params;

  const { verifyUser } = useUserContext();

  return (
    <div className="login-page  flex flex-col justify-center items-center">
      <div className="bg-white flex flex-col justify-center gap-[1rem] px-[4rem] py-[2rem] rounded-md">
        <h1 className="text-[#999] text-[2rem]">Verify Your Account</h1>
        <button
          className="px-4 py-2 self-center bg-blue-500 text-white rounded-md"
          onClick={() => {
            verifyUser(verificationToken);
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default page;
