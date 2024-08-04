// enums
enum Category {
  CLOTH = "CLOTH",
  ELECTRONICS = "ELECTRONICS",
}
enum Role {
  USER="USER",
  ADMIN="ADMIN"
}

// enums

// types
export type User = {
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
  hops: Hops[];
};

export type Hops = {
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

export type RefreshTokenResp = {
  access_token : string;
  refresh_token : string;
}

export enum Gravity {
  CENTER='center',
  START='start',
  END='end'
}
