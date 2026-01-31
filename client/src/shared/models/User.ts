export interface User {
  id: number;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}
export interface UserRegisterModel {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
