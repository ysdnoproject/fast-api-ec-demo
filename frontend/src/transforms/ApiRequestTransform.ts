import {
  CreateUserFormParams,
  CreateUserRequest
} from "@/types/CreateUserInterface";
import { LoginFormParams, LoginRequest } from "@/types/LoginInterface";

export const buildCreateUserRequest = (
  params: CreateUserFormParams
): CreateUserRequest => {
  return {
    email: params.email,
    phone: params.phone,
    name: params.name,
    password: params.password
  };
};

export const buildLogInRequest = (params: LoginFormParams): LoginRequest => {
  return {
    username: params.email,
    password: params.password
  };
};
