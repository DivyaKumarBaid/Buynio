import NextAuth,{DefaultSession} from "next-auth";

type User = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    username: string;
    role: string;
    signInMethod: string;
    access_token: string;
    refresh_token: string;
  };

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession['user'];
  }
}