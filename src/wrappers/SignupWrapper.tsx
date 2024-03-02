"use client"
import React, { ReactNode } from "react";

type UserCredType = {
  email: String;
  password: String;
}

export type PasswordProviderType = {
    kUser: UserCredType | null;
    setKUser: React.Dispatch<React.SetStateAction<UserCredType | null>>;
}

export const PasswordProvider = React.createContext<PasswordProviderType | null>(null);
export const usePasswordContext = () => {
    return React.useContext(PasswordProvider);
}

export const SignupWrapper = ({ children }: { children: ReactNode }) => {

    const [kUser,setKUser] = React.useState<UserCredType | null>(null);

  return (
    <PasswordProvider.Provider value={{kUser,setKUser}}>
        {children}
    </PasswordProvider.Provider>
  );
};

export default SignupWrapper;
