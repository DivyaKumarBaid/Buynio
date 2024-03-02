export type User = {
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

export type RefreshTokenResp = {
  access_token : string;
  refresh_token : string;
}
