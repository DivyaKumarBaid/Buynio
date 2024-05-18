import { User } from "./global.types";

export type CredentialForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type CreateUserResp = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  username: string;
};

export type VerifyOTPResp = {
  message: string;
  user: User;
};

export type VerifyOTPPayload = {
  id: string;
  otp: string;
};
