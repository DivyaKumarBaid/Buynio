"use client";
import useForm from "@/hooks/useForm";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleSigninButton from "../general/GoogleSigninButton";
import Divider from "../general/Divider";
import { CredentialForm } from "@/types/signup.types";
import Link from "next/link";
import { createUser } from "@/service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PageLoader from "../general/PageLoader";
import FormButton from "../general/FormButton";
import { usePasswordContext } from "@/wrappers/SignupWrapper";

const initialForm: CredentialForm = {
  username: "",
  email: "",
  password: "",
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
  const [error, setError] = useState<String | null>(null);
  const [subDisabled, setSubDisabled] = useState<Boolean>(true);

  const createUserMutation = useMutation({
    mutationFn: async (user: CredentialForm) => {
      const payload = await createUser(user);
      return payload;
    },
    onSuccess: (data) => {
      if (data?.id) {
        // Handle successful creation, e.g., redirect or show success message
        useKnowledge?.setKUser({ email: value.email, password: value.password });
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
    createUserMutation.mutate(value);
  };

  useEffect(() => {
    let disableBtn: Boolean = false;
    Object.keys(value).map((key) => {
      if (value[key].length <= 0) {
        disableBtn = true;
        return;
      }
      if (key == "email") {
        disableBtn = disableBtn || !value[key].includes("@");
      }
    });
    setSubDisabled(disableBtn);
  }, [value]);

  return (
    <div className="flex justify-center items-center flex-col relative overflow-hidden rounded-xl md:min-w-[25vw] min-w-full md:min-h-[25vh]">
      <PageLoader isLoading={createUserMutation.isPending} />
      <div className="bg-[rgb(var(--card-bg-color))] md:min-w-[25vw] min-w-full md:min-h-[25vh] rounded-xl shadow-lg border-[0.1px] border-[rgba(var(--card-border-color))] p-8 flex justify-center items-center flex-col gap-8 w-full h-full">
        <GoogleSigninButton />
        <Divider />
        <div className="w-full p-4 flex flex-col gap-8">
          {!!error && <div className="text-[rgba(255,0,0)]">{error}</div>}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[rgba(var(--text-secondary-low-color))] text-sm">
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
              className="w-full focus:border-[rgba(var(--border-hover-color))] outline-none hover:border-[0.2px] hover:border-[rgba(var(--border-focus-color))] rounded-xl bg-transparent border-[0.2px] border-[rgba(var(--card-border-color))] p-4 placeholder-[rgba(var(--text-secondary-low-color))] placeholder-opacity-50 duration-500"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[rgba(var(--text-secondary-low-color))] text-sm">
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
              className="w-full focus:border-[rgba(var(--border-hover-color))] outline-none hover:border-[0.2px] hover:border-[rgba(var(--border-focus-color))] rounded-xl bg-transparent border-[0.2px] border-[rgba(var(--card-border-color))] p-4 placeholder-[rgba(var(--text-secondary-low-color))] placeholder-opacity-50 duration-500"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="text pl-2 text-[rgba(var(--text-secondary-low-color))] text-sm">
              Password
            </div>
            <input
              type="password"
              name="password"
              value={value.password}
              onChange={(e) => {
                setError(null);
                handleChange(e);
              }}
              placeholder="Codeword only you know"
              className="w-full focus:border-[rgba(var(--border-hover-color))] outline-none hover:border-[0.2px] hover:border-[rgba(var(--border-focus-color))] rounded-xl bg-transparent border-[0.2px] border-[rgba(var(--card-border-color))] p-4 placeholder-[rgba(var(--text-secondary-low-color))] placeholder-opacity-50 duration-500"
            />
          </div>
          <FormButton
            text={"Signup"}
            disabled={subDisabled}
            onClickFunc={handleCreateUser}
          />
          <div className="text-xs tracking-widest text-[rgba(var(--text-secondary-color))]">
            Have an account?{" "}
            <Link href="/login" className="text-white cursor-pointer">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
