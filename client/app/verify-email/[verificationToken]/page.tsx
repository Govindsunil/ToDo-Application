// app/verify-email/[verificationToken]/page.tsx

import VerifyClient from "./VerifyClient";

export default function Page({ params }: any) {
  return <VerifyClient verificationToken={params.verificationToken} />;
}
