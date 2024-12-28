"use client";
import { INSTAGRAM_PROVIDER_ID } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import RippleButton from "../formComponents/components/Ripple";

const GoogleSigninButton = () => {
  // check if already logged in then redirect to home page
  const { data: session } = useSession();
  useEffect(() => {
    if (!!session?.user?.refresh_token) {
      redirect("/");
    }
  }, [session?.user?.refresh_token]);

  return (
      <RippleButton
        onClick={() => signIn(INSTAGRAM_PROVIDER_ID, { callbackUrl: "/" })}
        btnClass="group w-[90%] flex justify-between items-center gap-8 cursor-pointer border-[0.5px] border-[var(--card-border-color)] px-4 py-3 rounded-3xl text-md hover:bg-[var(--card-bg-hover-color)] duration-400 transition-all hover:border-[var(--border-hover-color)]"
        rippleBackground="rgba(150,150,150,0.8)"
      >
        <FcGoogle fontSize={28}/>
        <span className=" group-hover:text-white duration-400 text-[var(--text-secondary-color)]"> Sign in with {INSTAGRAM_PROVIDER_ID} </span>
      </RippleButton>
  );
};

export default GoogleSigninButton;
