import { useFormContext } from 'react-hook-form';
import InputError from './InputError';
import { InputProps } from '../features/auth/types';

const FormInput = ({
  label,
  type,
  placeholder,
  id,
  name,
  errors,
}: InputProps) => {
  const form = useFormContext();
  const { register } = form;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      <div>
        <InputError errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormInput;
