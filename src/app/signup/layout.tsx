import type { Metadata } from "next";
import SignupWrapper from "@/wrappers/SignupWrapper";

export const metadata: Metadata = {
  title: "Signup",
  description: "Public Service",
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignupWrapper>
      {children}
    </SignupWrapper>
  );
}
