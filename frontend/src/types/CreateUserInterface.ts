interface CreateUserBase {
  email: string;
  phone: string;
  name: string;
}

export interface CreateUserRequest extends CreateUserBase {
  password: string;
}

export interface CreateUserResponse extends CreateUserBase {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserFormParams extends CreateUserBase {
  password: string;
  confirmPassword: string;
}
