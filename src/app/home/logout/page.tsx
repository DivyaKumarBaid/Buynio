'use client'
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    signOut({ callbackUrl: "/home/login" });
  }, []);

  return <div></div>;
};

export default Page;
