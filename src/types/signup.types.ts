import { User } from "./global.types";

export type CredentialForm = {
  username: String;
  email: String;
  password: String;
};
export type CreateUserResp = {
  id: Number;
  createdAt: String;
  updatedAt: String;
  email: String;
  username: String;
};

export type VerifyOTPResp = {
  message: String;
  user: User;
};

export type VerifyOTPPayload = {
  id: String;
  otp: String;
};
