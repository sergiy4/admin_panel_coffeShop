import { PersonSignUpType, PersonLoginType } from './schemas';
import { FieldErrors } from 'react-hook-form';

// SignUp form
type PersonFieldName =
  | 'name'
  | 'surname'
  | 'password'
  | 'email'
  | 'city'
  | 'country'
  | 'role';

export interface InputErrorProps {
  name: PersonFieldName;
  errors: FieldErrors<PersonSignUpType>;
}

export interface InputProps extends InputErrorProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
}

export interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}
// Login form
type PersonLoginFieldName = 'email' | 'password';

export interface LoginInputErrorProps {
  name: PersonLoginFieldName;
  errors: FieldErrors<PersonLoginType>;
}

export interface LoginInputProps extends LoginInputErrorProps {
  label: string;
  id: string;
  type?: 'email' | 'password';
  placeholder?: string;
}

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
  userID: string;
}

export interface AuthInitialState {
  token: null | string;
  userID: null | string;
}
