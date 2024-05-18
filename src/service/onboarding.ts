import api from "@/lib/axios";
import { RefreshTokenResp } from "@/types/global.types";
import { AxiosResponse } from "axios";
import { Session } from "next-auth";

export const toggleOnboarding = async (session: Session | null) => {
  if (session && session.user && session.user?.access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    };
    const payload: AxiosResponse<RefreshTokenResp, any> = await api.get(
      "user/onBoarding",
      config
    );
    return payload.data;
  }
};
