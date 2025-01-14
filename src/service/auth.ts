import api from "@/lib/axios";
import { APIResponse } from "@/types/global.types";
import {
  CredentialForm,
  VerifyOTPPayload
} from "@/types/signup.types";
import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const handleAPIError = (errorResponse: any) => {
  if (errorResponse.error) {
    console.error("Developer Message:", errorResponse.developerMessage);
    toast.error(errorResponse.displayMessage || "An error occurred");
    throw new Error(errorResponse.developerMessage);
  }
};

export const fetchRefreshToken = async (session: Session | null) => {
  if (session?.user?.refresh_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.refresh_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get(
        "auth/refresh",
        config
      );
      handleAPIError(payload.data);
      return payload.data.response;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  } else {
    redirect("/api/auth/signin");
  }
};

export const getUser = async (session: Session | null) => {
  if (session?.user?.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get("user", config);
      handleAPIError(payload.data);
      return payload.data.response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  } else {
    redirect("/api/auth/signin");
  }
};

export const createUser = async (user: CredentialForm) => {
  try {
    const payload: AxiosResponse<APIResponse> = await api.post(
      "auth/local/signup",
      user
    );
    handleAPIError(payload.data);
    return payload.data.response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const verifyOtp = async (otp: VerifyOTPPayload) => {
  try {
    const payload: AxiosResponse<APIResponse> = await api.post(
      "auth/local/verify",
      otp
    );
    handleAPIError(payload.data);
    return payload.data.response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
