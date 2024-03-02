"use client";
import useForm from "@/hooks/useForm";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormButton from "../general/FormButton";
import { useMutation } from "@tanstack/react-query";
import { VerifyOTPPayload, VerifyOTPResp } from "@/types/signup.types";
import { verifyOtp } from "@/service/auth";
import { signIn } from "next-auth/react";
import { CREDENTIAL_PROVIDER_ID } from "@/lib/constants";
import { usePasswordContext } from "@/wrappers/SignupWrapper";
import PageLoader from "../general/PageLoader";
import { useRouter } from "next/navigation";

const digits = [0, 1, 2, 3];

const VerifyForm = ({ id }: { id: String }) => {
  const [value, handleChange] = useForm({
    otp: "",
  });
  const router = useRouter();
  const useKnowledge = usePasswordContext();
  const [error, setError] = useState<String | null>(null);
  const [btnDisabled, setBtnDisabled] = useState<Boolean>(true);

  const inputRef = React.useRef<Array<HTMLDivElement | null>>([]);

  const handleDigitChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const otpArr = value.otp.split("");
    otpArr[i] = e.target.value;
    const newValue = otpArr.join("");
    handleChange({
      target: { name: "otp", value: newValue.slice(0,Math.min(newValue.length,4)), type: "number", checked: false },
    }); //hack to mimic event
    if (newValue.length <= 4) {
      // shift focus to next input
      inputRef.current[newValue.length - 1]?.focus();
    }
  };

  const verifyOtpMutation = useMutation({
    mutationFn: async (otp: VerifyOTPPayload) => {
      const payload = await verifyOtp(otp);
      return payload;
    },
    onSuccess: (_) => {
      const user = useKnowledge?.kUser
      console.log({...user,callbackUrl: "/" });
      signIn(CREDENTIAL_PROVIDER_ID, {...user,callbackUrl: "/" })
      //   router.push(`signup/verify/${data.id}`); // Example
    },
    onError: (error) => {
      console.error(error);
      setError("Wrong OTP!"); // Implement error handling logic
    },
  });

  const handleVerfiyOtp = async () => {
    verifyOtpMutation.mutateAsync({ id, otp: value.otp });
  };

  useEffect(() => {
    let disableBtn: Boolean = false;
    Object.keys(value).map((key) => {
      if (value[key].length < 4) {
        disableBtn = true;
        return;
      }
    });
    setBtnDisabled(disableBtn);
  }, [value]);

  useEffect(()=>{
    if(!(useKnowledge?.kUser)){
      router.push('/login')
    }
  },[])

  return (
    <div className="flex justify-center items-center flex-col relative overflow-hidden rounded-xl md:min-w-[25vw] min-w-full md:min-h-[25vh]">
      <PageLoader isLoading = {verifyOtpMutation.isPending} />
      <div className="bg-[rgb(var(--card-bg-color))] md:min-w-[25vw] min-w-full md:min-h-[25vh] rounded-xl shadow-lg border-[0.1px] border-[rgba(var(--card-border-color))] p-8 flex justify-center items-center flex-col gap-8 w-full h-full">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="text-3xl">Is that really you!</div>
          <div className="text-xs text-[rgba(var(--text-secondary-color))]">
            Verify using the otp sent to you on you e-mail
          </div>
          {!!error && <div className="text-[rgba(255,0,0)]">{error}</div>}
        </div>
        <div className="flex gap-8 m-4 mt-8">
          {digits.map((_, i) => {
            return (
              <input
                key={"OTPREADER" + i}
                type="number"
                min={0}
                max={9}
                name="first"
                autoFocus={i === 0}
                value={value.otp.length - 1 < i ? "" : value.otp[i]}
                ref={(el) => (inputRef.current[i] = el)}
                onChange={(e) =>
                  handleDigitChange(e, i)
                }
                className="outline-none bg-transparent focus:border-b-[rgba(var(--border-focus-color))] border-[rgba(var(--card-border-color))] hover:border-b-[rgba(var(--card-border-hover-color))] border-b-[1.2px] text-2xl flex justify-center text-center p-2 w-[4vw] min-w-[50px]"
              />
            );
          })}
        </div>
        <FormButton
          text={"Verify"}
          disabled={btnDisabled}
          onClickFunc={handleVerfiyOtp}
        />
      </div>
    </div>
  );
};

export default VerifyForm;
