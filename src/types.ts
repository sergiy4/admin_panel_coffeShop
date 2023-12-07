import { FieldErrors } from 'react-hook-form';

export interface InputErrorProps {
  name: string;
  errors: FieldErrors;
}

type ReactSelect = {
  label: string;
  value: string;
};

export type InputProps = InputErrorProps & {
  label: string;
  id?: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'number';
  placeholder?: string;
  defaultValue?: string | number;
};

export interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
  defaultOptions?: ReactSelect;
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}
