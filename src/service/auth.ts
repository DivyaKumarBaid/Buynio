import api from "@/lib/axios";
import { RefreshTokenResp, User } from "@/types/global.types";
import {
  CreateUserResp,
  CredentialForm,
  VerifyOTPPayload,
  VerifyOTPResp,
} from "@/types/signup.types";
import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const fetchRefreshToken = async (session: Session | null) => {
  if (session && session.user && session.user?.refresh_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${session.user.refresh_token}`,
      },
    };
    const payload: AxiosResponse<RefreshTokenResp, any> = await api.get(
      "auth/refresh",
      config
    );
    if (payload.status !== 201 && payload.status !== 200) {
      redirect("/api/auth/signin");
    }
    return payload.data;
  } else {
    redirect("/api/auth/signin");
  }
};

export const createUser = async (user: CredentialForm) => {
  const config = user;
  const payload: AxiosResponse<CreateUserResp, any> = await api.post(
    "auth/local/signup",
    config
  );
  if (payload.status != 200 && payload.status != 201) {
    throw new Error("User already exist");
  }
  return payload.data;
};

export const verifyOtp = async (otp: VerifyOTPPayload) => {
  const config = otp;
  const payload: AxiosResponse<VerifyOTPResp, any> = await api.post(
    "auth/local/verify",
    config
  );
  if (payload.status != 200 && payload.status != 201) {
    throw new Error("User already exist");
  }
  return payload.data;
};
