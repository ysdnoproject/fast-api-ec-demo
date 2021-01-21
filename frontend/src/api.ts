import axios, { AxiosResponse } from "axios";
import {
  CreateUserRequest,
  CreateUserResponse
} from "@/types/CreateUserInterface";
import setupInterceptors from "@/axios-interceptors";
import { LoginRequest, LoginResponse } from "@/types/LoginInterface";
import { User } from "@/models/User";

export interface ApiClient {
  createUser: (
    request: CreateUserRequest
  ) => Promise<AxiosResponse<CreateUserResponse>>;
  login: (request: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;
  getMe: (token: string) => Promise<AxiosResponse<User>>;
}

const authHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const create = (): ApiClient => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_SERVE_BASE_URL,
    timeout: parseInt(process.env.VUE_APP_REQUEST_TIMEOUT as string, 10)
  });
  setupInterceptors(axiosInstance);
  const createUser = (request: CreateUserRequest) => {
    return axiosInstance.post("/users", request);
  };

  const login = (request: LoginRequest) => {
    const formData = new FormData();
    formData.append("username", request.username);
    formData.append("password", request.password);
    return axiosInstance.post("/login", formData);
  };

  const getMe = (token: string) => {
    return axiosInstance.get("/users/me", authHeaders(token));
  };

  return {
    createUser,
    login,
    getMe
  };
};

const api = create();

export default api;
