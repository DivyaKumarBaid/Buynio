import api from "@/lib/axios";
import { CREDENTIAL_PROVIDER_ID, GOOGLE_PROVIDER_ID } from "@/lib/constants";
import { User } from "@/types/global.types";
import { AxiosResponse } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// importing all the env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      id: GOOGLE_PROVIDER_ID
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace with your actual username/email fetching logic
        const user = await api.post("auth/local/login", {
          email:credentials?.email,
          password:credentials?.password
        });

        if (user?.status==201) {
          return user.data;
        }

        // Return the user object if successful
        // Handle non-existent user
        throw new Error('No user found');
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user:incUser}) {
      if(account?.provider == CREDENTIAL_PROVIDER_ID){
        account.user = incUser
        return true;
      }
      if (!profile?.email) {
        throw new Error("No profile");
      }

      // check for user and if it doesnt exit then create - call backend
      const user: AxiosResponse<User> = await api.post("auth/google/login", {
        token: account?.id_token,
      });

      // check if the response from server is ok
      if (account && user.status === 201) {
        account.user = user.data;
      }
      return true;
    },
    async jwt({ token, account, trigger , session}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.user = account.user;
      }
      if(trigger=="update"){
        token = {...token,user:session?.user}
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session
    },
  },
  pages:{
    signIn:'/home/login'
  }
};