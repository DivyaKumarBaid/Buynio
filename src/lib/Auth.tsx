'use client'
import { signOut, useSession } from "next-auth/react";
import { useEffect, ReactNode } from "react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { refreshTokenKey } from "./keys";
import { fetchRefreshToken } from "@/service/auth";
import {
  ACCESS_TOKEN_EXPIRY_LIMIT,
  ACCESS_TOKEN_STALE_TIME,
} from "./constants";

export default function Auth({ children }: { children: ReactNode }) {
  const { data: session, update } = useSession();

  const { error, data } = useQuery({
    queryKey: [refreshTokenKey],
    queryFn: () => fetchRefreshToken(session),
    enabled: !!session?.user?.refresh_token,
    gcTime: ACCESS_TOKEN_STALE_TIME,
    staleTime: ACCESS_TOKEN_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: ACCESS_TOKEN_EXPIRY_LIMIT,
  });

  useEffect(() => {
    if (error) {
      console.error("Error refreshing token:", error);
      signOut().then(redirect("/login"));
    }

    if (data) {
      update({
        ...session,
        user: {
          ...session?.user,
          access_token: data?.access_token,
          refresh_token: data?.refresh_token,
        },
      });
    }
  }, [data, error]);

  return <>{children}</>;
}

