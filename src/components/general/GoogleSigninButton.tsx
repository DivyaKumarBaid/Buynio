"use client";
import { GOOGLE_PROVIDER_ID } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSigninButton = () => {
  // check if already logged in then redirect to home page
  const { data: session } = useSession();
  useEffect(() => {
    if (!!session?.user?.refresh_token) {
      redirect("/");
    }
  }, []);

  return (
      <div
        onClick={() => signIn(GOOGLE_PROVIDER_ID, { callbackUrl: "/" })}
        className="group w-[90%] flex justify-between items-center gap-8 cursor-pointer border-[0.5px] border-[rgba(var(--card-border-color))] px-4 py-3 rounded-3xl text-md hover:bg-[rgba(var(--card-bg-hover-color))] duration-400 transition-all hover:border-[rgba(var(--border-hover-color))]"
      >
        <FcGoogle fontSize={28}/>
        <span className=" group-hover:text-white duration-400 text-[rgb(var(--text-secondary-color))]"> Sign in with {GOOGLE_PROVIDER_ID} </span>
      </div>
  );
};

export default GoogleSigninButton;
