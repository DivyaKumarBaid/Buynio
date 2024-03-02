"use client"
import Auth from "@/lib/Auth";
import { CustomQueryClientProvider } from "@/lib/CustomQueryClientProvider";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const GlobalWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <CustomQueryClientProvider>
      <SessionProvider>
        <Auth>{children}</Auth>
      </SessionProvider>
    </CustomQueryClientProvider>
  );
};

export default GlobalWrapper;
