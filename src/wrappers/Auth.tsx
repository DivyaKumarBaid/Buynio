"use client";
import { fetchRefreshToken } from "@/service/auth";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import {
  ACCESS_TOKEN_EXPIRY_LIMIT,
  ACCESS_TOKEN_STALE_TIME,
  loggedInRestrictedPaths,
  unrestrictedPaths,
  unrestrictedPathsWithParam,
} from "../lib/constants";
import { refreshTokenKey } from "../lib/keys";

export default function Auth({ children }: { children: ReactNode }) {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const { error, data } = useQuery({
    queryKey: [refreshTokenKey],
    queryFn: () => fetchRefreshToken(session),
    enabled:
      status != "loading" &&
      !unrestrictedPaths.includes(pathName) &&
      !unrestrictedPathsWithParam.find(path => pathName.startsWith(path)) &&
      !!session?.user?.refresh_token,
    gcTime: ACCESS_TOKEN_STALE_TIME,
    staleTime: ACCESS_TOKEN_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: ACCESS_TOKEN_EXPIRY_LIMIT,
  });

  useEffect(() => {
    if (error) {
      console.error("Error refreshing token:", error);
      signOut({ callbackUrl: "/home/login" });
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

  useEffect(() => {
    if (status != "loading") {
      if (
        session == null &&
        (!unrestrictedPaths.includes(pathName) &&
        !unrestrictedPathsWithParam.find(path => {
          return pathName.startsWith(path)}))
      ) {
        signOut({ callbackUrl: "/home/login" });
      } else if (
        session != null &&
        !session?.user?.onBoarded &&
        pathName != "/home/onboard"
      ) {
        router.push("/home/onboard");
      }
      else if(
        session != null &&
        loggedInRestrictedPaths.includes(pathName)
      ){
        router.push('/');
      }
    }
  }, [session, status, pathName]);

  // useEffect(()=>{
  //   if(status!="loading"){
  //     if(session!=null && !session?.user?.onBoarded && pathname!="/onboard"){
  //       redirect('/onboard')
  //     }
  //   }
  // },[session,status])

  return <>{children}</>;
}
