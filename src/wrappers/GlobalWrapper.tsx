"use client";
import Auth from "@/wrappers/Auth";
import { CustomQueryClientProvider } from "@/wrappers/CustomQueryClientProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import StyledComponentsRegistry from "./StyledCompManager";
import UserWrapper from "./UserWrapper";

// import StyledComponentsRegistry from "./StyledCompManager";
// import UserWrapper from "./UserWrapper";

const GlobalWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <CustomQueryClientProvider>
      <SessionProvider>
        <Auth>
          <UserWrapper>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </UserWrapper>
        </Auth>
      </SessionProvider>
    </CustomQueryClientProvider>
  );
};

export default GlobalWrapper;
