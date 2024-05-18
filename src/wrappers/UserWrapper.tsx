"use client";
import { getUser } from "@/service/auth";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

type UserProviderType = {
  updateUser: () => void;
};

export const UserProvider = React.createContext<UserProviderType | null>(null);
export const useUser = () => {
  return React.useContext(UserProvider);
};

export const UserWrapper = ({ children }: { children: ReactNode }) => {
  const { data: session, update: updateSession } = useSession();

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      const payload = await getUser(session);
      return payload;
    },
    onSuccess: (data) => {
      if (data?.id) {
        updateSession({
          ...session,
          user: {
            ...session?.user,
            ...data,
          },
        });
      } else {
        throw new Error("Something went wrong");
      }
    },
    onError: (_) => {
      toast.error("You are not logged in");
      signOut({ callbackUrl: "/home/login" });
    },
  });

  const updateUser = () => {
    updateUserMutation.mutate();
  };

  return (
    <UserProvider.Provider value={{ updateUser }}>
      {children}
    </UserProvider.Provider>
  );
};

export default UserWrapper;
