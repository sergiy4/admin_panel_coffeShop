import { FieldErrors } from 'react-hook-form';

export interface InputErrorProps {
  name: string;
  errors: FieldErrors;
}

export interface InputProps extends InputErrorProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  defaultValue?: string;
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
