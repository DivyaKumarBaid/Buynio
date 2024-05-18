import { getServerSession } from "next-auth";

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

  return await authUserSession.user;
};
