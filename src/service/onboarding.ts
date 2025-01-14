import api from "@/lib/axios";
import { APIResponse } from "@/types/global.types";
import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import toast from "react-hot-toast";

export const toggleOnboarding = async (session: Session | null) => {
  if (session?.user?.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get(
        "user/onBoarding",
        config
      );
      if (payload.data.error) {
        console.error("Developer Message:", payload.data.developerMessage);
        toast.error(payload.data.displayMessage || "An error occurred");
        throw new Error(payload.data.developerMessage);
      }
      return payload.data.response;
    } catch (error) {
      console.error("Error toggling onboarding:", error);
      throw error;
    }
  }
};
