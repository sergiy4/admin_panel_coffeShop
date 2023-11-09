import { InputErrorProps } from '../features/auth/types';
import { ErrorMessage } from '@hookform/error-message';

const InputError = ({ errors, name }: InputErrorProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p>{message}</p>}
    />
  );
};

export default InputError;
