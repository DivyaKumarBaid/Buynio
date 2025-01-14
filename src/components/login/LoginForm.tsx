"use client";
import useForm from "@/hooks/useForm";
import { CREDENTIAL_PROVIDER_ID } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Divider from "../general/Divider";
import FormButton from "../general/FormButton";
import GoogleSigninButton from "../general/GoogleButton";
import PageLoader from "../general/PageLoader";
import InstagramSigninButton from "../general/InstagramButton";

type UserLoginType = {
  email: string;
  password: string;
};

const initialForm: UserLoginType = {
  email: "",
  password: "",
};

const LoginForm = () => {
  // check if already logged in then redirect to home page
  const { data: session } = useSession();
  useEffect(() => {
    if (!!session?.user?.refresh_token) {
      redirect("/");
    }
  }, []);

  const [value, handleChange] = useForm(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPass,setViewPass] = useState<boolean>(false);
  const [subDisabled, setSubDisabled] = useState<boolean>(true);

  const handleCreateUser = async () => {
    setLoading(true);
    signIn(CREDENTIAL_PROVIDER_ID, { ...value, callbackUrl: "/" });
  };

  useEffect(() => {
    let disableBtn: boolean = false;
    Object.keys(value).map((key) => {
      if (typeof value === 'object' && value[key].length <= 0) {
        disableBtn = true;
        return;
      }
      if (key == "email") {
        disableBtn = disableBtn || (typeof value === 'object' && !value[key].includes("@"));
      }
    });
    setSubDisabled(disableBtn);
  }, [value]);

  return (
    <div className="shadow-[3px_3px_16px_rgba(0,0,0,0.3)] flex justify-center items-center flex-col relative overflow-hidden rounded-xl md:min-w-[25vw] min-w-full md:min-h-[25vh]">
      <PageLoader isLoading={loading} />
      <div className="bg-[var(--card-bg-color)] md:min-w-[25vw] min-w-full md:min-h-[25vh] rounded-xl border-[0.1px] border-[var(--card-border-color)] p-8 flex justify-center items-center flex-col gap-8 w-full h-full">
        <GoogleSigninButton />
        <InstagramSigninButton />
        <Divider />
        <div className="w-full p-4 flex flex-col gap-8">
          {!!error && <div className="text-[rgba(255,0,0)]">{error}</div>}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[var(--text-secondary-low-color)] text-sm">
              Email
            </div>
            <input
              type="text"
              name="email"
              value={value.email}
              onChange={(e) => {
                setError(null);
                handleChange(e);
              }}
              placeholder="How to contact you?"
              className="w-full focus:border-[var(--border-hover-color)] outline-none hover:border-[0.2px] hover:border-[var(--border-focus-color)] rounded-xl bg-transparent border-[0.2px] border-[var(--card-border-color)] p-4 placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500"
            />
          </div>

          <div className="w-full flex flex-col max-w-[100%] justify-start items-start gap-2">
            <div className="text pl-2 text-[var(--text-secondary-low-color)] text-sm">
              Password
            </div>
            <div className="flex gap-4 justify-between items-center w-[100%]">
              <input
                type={viewPass ? "text" : "password"}
                name="password"
                value={value.password}
                onChange={(e) => {
                  setError(null);
                  handleChange(e);
                }}
                placeholder="Codeword only you know"
                className="w-full focus:border-[var(--border-hover-color)] outline-none hover:border-[0.2px] hover:border-[var(--border-focus-color)] rounded-xl bg-transparent border-[0.2px] border-[var(--card-border-color)] p-4 placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500"
              />
              {viewPass ? (
                <BsEye
                  className="text-[var(--border-focus-color)] hover:text-[var(--border-hover-color)] cursor-pointer"
                  fontSize={20}
                  onClick={() => setViewPass((prev) => !prev)}
                />
              ) : (
                <BsEyeSlash
                  className="text-[var(--border-focus-color)] hover:text-[var(--border-hover-color)] cursor-pointer"
                  fontSize={20}
                  onClick={() => setViewPass((prev) => !prev)}
                />
              )}
            </div>
          </div>

          <FormButton
            text={"Login"}
            disabled={subDisabled}
            onClickFunc={handleCreateUser}
          />
          <div className="text-xs tracking-widest text-[var(--text-secondary-color)]">
            Dont have an account?
            <Link href="/home/signup" className="text-white cursor-pointer ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
