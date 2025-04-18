// app/verify-email/[verificationToken]/VerifyClient.tsx
"use client";

import { useUserContext } from "@/context/userContext";

interface Props {
  verificationToken: string;
}

export default function VerifyClient({ verificationToken }: Props) {
  const { verifyUser } = useUserContext();

  return (
    <div className="auth-page flex flex-col justify-center items-center">
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
