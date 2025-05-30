import api from "@/lib/axios";
import {
  CREDENTIAL_PROVIDER_ID,
  GOOGLE_PROVIDER_ID,
  INSTAGRAM_PROVIDER_ID,
} from "@/lib/constants";
import { APIResponse, User } from "@/types/global.types";
import { AxiosResponse } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import jwt from "jsonwebtoken";

// importing all the env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_APP_ID!;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_APP_SECRET!;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  debug: true,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      id: GOOGLE_PROVIDER_ID,
    }),
    InstagramProvider({
      clientId: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      id: "instagram",
      authorization: {
        params: {
          scope: "instagram_business_basic",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your actual username/email fetching logic
        const user = await api.post("auth/local/login", {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (user?.status == 201 && user?.data?.error == false) {
          return user.data?.response;
        }

        // Return the user object if successful
        // Handle non-existent user
        throw new Error("No user found");
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user: incUser }) {
      if (account?.provider == CREDENTIAL_PROVIDER_ID) {
        account.user = incUser;
        return true;
      }
      if (account?.provider == GOOGLE_PROVIDER_ID) {
        if (!profile?.email) {
          throw Error("No Profile Found");
        }

        // check for user and if it doesnt exit then create - call backend
        const user: AxiosResponse<APIResponse<User>> = await api.post("auth/google/login", {
          token: account?.id_token,
        });

        // check if the response from server is ok
        if (account && user.status === 201 && user.data.error == false) {
          account.user = user.data.response;
        }
        return true;
      }
      if (account?.provider == INSTAGRAM_PROVIDER_ID) {
        const userInfo = {
          access_token: account?.access_token,
          username: incUser.name,
          user_id: account?.user_id,
          name: profile?.name,
        };
        const token = jwt.sign(
          { data: userInfo },
          process.env.INSTAGRAM_ACCESS_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );
        const user: AxiosResponse<APIResponse<User>> = await api.post(
          "auth/instagram/login",
          {
            token,
          }
        );
        if (account && user.status === 201 && user.data.error==false) {
          account.user = user.data.response;
        }
        if (profile && user.data.error==false) profile.email = user.data.response?.email;
        return true;
      }
      return false;
    },
    async jwt({ token, account, trigger, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.user = account.user;
      }
      if (trigger == "update") {
        token = { ...token, user: session?.user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/home/login",
  },
};
