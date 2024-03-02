import { User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const session = async ({ session, token }: any) => {
  session.user = { ...session.user, ...token.user };
  return session;
};

export const getUserSession = async (): Promise<any> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  if (!authUserSession) redirect("/api/auth/signin");

  return await authUserSession.user;
};
