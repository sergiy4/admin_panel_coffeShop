// RTK
export interface User {
  id?: string;
  name: string;
  hash: string;
  surname: string;
  email: string;
  city: string;
  country: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserInfo {
  accessToken: string;
  // userID: string;
}

export interface AuthInitialState {
  token: null | string;
}
