import { DefaultSession } from "next-auth";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  role: Role;
  signInMethod: string;
  access_token: string;
  refresh_token: string;
  onBoarded: boolean;
  brand: Hops[];
};

type Hops = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  name: string;
  logo: string;
  instagramAccount: string;
  otherReachout: string;
  descrtiption: string;
  motto: string;
  category: Category;
  verified: boolean;
};

enum Category {
  CLOTH = "CLOTH",
  ELECTRONICS = "ELECTRONICS",
}

enum Role {
  USER="USER",
  ADMIN="ADMIN"
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
