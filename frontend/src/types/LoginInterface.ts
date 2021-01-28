import { User } from "@/models/User";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginFormParams {
  email: string;
  password: string;
}
