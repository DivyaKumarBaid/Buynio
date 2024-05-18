"use client";
import useForm from "@/hooks/useForm";
import { PASSWORD_REGEX } from "@/lib/constants";
import { passwordStrengthError } from "@/lib/english";
import { createUser } from "@/service/auth";
import { CredentialForm } from "@/types/signup.types";
import { usePasswordContext } from "@/wrappers/SignupWrapper";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RxCheck, RxCross2 } from "react-icons/rx";
import Divider from "../general/Divider";
import FormButton from "../general/FormButton";
import GoogleSigninButton from "../general/GoogleSigninButton";
import PageLoader from "../general/PageLoader";

const initialForm: CredentialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  // check if already logged in then redirect to home page
  const { data: session } = useSession();
  const useKnowledge = usePasswordContext();
  useEffect(() => {
    if (!!session?.user?.refresh_token) {
      redirect("/");
    }
  }, []);

  const router = useRouter();

  const [value, handleChange] = useForm(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [subDisabled, setSubDisabled] = useState<boolean>(true);
  const [viewPass, setViewPass] = useState<boolean>(false);

  const createUserMutation = useMutation({
    mutationFn: async (user: CredentialForm) => {
      const payload = await createUser(user);
      return payload;
    },
    onSuccess: (data) => {
      if (data?.id) {
        // Handle successful creation, e.g., redirect or show success message
        useKnowledge?.setKUser({
          email: value.email,
          password: value.password,
        });
        router.push(`signup/verify/${data.id}`); // Example
      } else {
        throw new Error("Something went wrong");
      }
    },
    onError: (error) => {
      console.error(error);
      setError("Here Something went wrong"); // Implement error handling logic
    },
  });

  const handleCreateUser = async () => {
    createUserMutation.mutate(value as CredentialForm);
  };

  const checkPasswordStrength = () => {
    return PASSWORD_REGEX.test(value.password)
  }

  useEffect(() => {
    let disableBtn: boolean = false;
    Object.keys(value).map((key) => {
      if (value[key].length <= 0) {
        disableBtn = true;
        return;
      }
      if (key == "email") {
        disableBtn = disableBtn || !value[key].includes("@");
      }
      if (key == "password"){
        disableBtn = disableBtn || !checkPasswordStrength();
      }
    });
    setSubDisabled(disableBtn);
  }, [value]);

  return (
    <div className="shadow-[3px_3px_16px_rgba(0,0,0.3)] flex justify-center items-center flex-col relative overflow-hidden rounded-xl md:min-w-[450px] min-w-full md:min-h-[25vh]">
      <PageLoader isLoading={createUserMutation.isPending} />
      <div className="bg-[var(--card-bg-color)] md:w-[25vw] min-w-full md:min-h-[25vh] rounded-xl shadow-lg border-[0.1px] border-[var(--card-border-color)] p-8 flex justify-center items-center flex-col gap-8 w-full h-full">
        <GoogleSigninButton />
        <Divider />
        <div className="w-full p-4 flex flex-col gap-8">
          {!!error && <div className="text-[rgba(255,0,0)]">{error}</div>}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[var(--text-secondary-low-color)] text-sm">
              Username
            </div>
            <input
              type="text"
              name="username"
              value={value.username}
              onChange={(e) => {
                setError(null);
                handleChange(e);
              }}
              placeholder="What you like us to call you ?"
              className="w-full focus:border-[var(--border-hover-color)] outline-none hover:border-[0.2px] hover:border-[var(--border-focus-color)] rounded-xl bg-transparent border-[0.2px] border-[var(--card-border-color)] p-4 placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500"
            />
          </div>
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
            {(value.password.length > 0 && !checkPasswordStrength()) && <span className="px-1 text-[var(--danger-secondary-color)] text-xs break-keep">{passwordStrengthError}</span>}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[var(--text-secondary-low-color)] text-sm">
              Confirm Password
            </div>
            <div className="flex gap-4 justify-between items-center w-[100%]">
              <input
                type="text"
                name="confirmPassword"
                value={value.confirmPassword}
                onChange={(e) => {
                  setError(null);
                  handleChange(e);
                }}
                placeholder="Retype if you know the code"
                className="w-full focus:border-[var(--border-hover-color)] outline-none hover:border-[0.2px] hover:border-[var(--border-focus-color)] rounded-xl bg-transparent border-[0.2px] border-[var(--card-border-color)] p-4 placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500"
              />
              {value.confirmPassword === value.password && value.password.length > 0 ? (
                <RxCheck
                  className="text-[var(--success-secondary-color)]"
                  fontSize={20}
                />
              ) : (
                <RxCross2
                  className="text-[var(--danger-secondary-color)]"
                  fontSize={20}
                />
              )}
            </div>
          </div>
          <FormButton
            text={"Signup"}
            disabled={subDisabled}
            onClickFunc={handleCreateUser}
          />
          <div className="text-xs tracking-widest text-[var(--text-secondary-color)]">
            Have an account?{" "}
            <Link href="/home/login" className="text-white cursor-pointer">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
