import InputErrorMessage from './InputErrorMessage';
import { InputProps } from '../types';
import { useFormContext } from 'react-hook-form';

const NumberInput = ({
  name,
  label,
  errors,
  placeholder,
  type,
  id,
  defaultValue,
}: InputProps) => {
  const { register } = useFormContext();

  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          min={0}
          max={100_000_000}
          placeholder={placeholder}
          {...register(name, {
            setValueAs: (val) => (val === '' ? undefined : parseInt(val, 10)),
          })}
          defaultValue={defaultValue}
        ></input>
      </div>
      <div>
        <InputErrorMessage name={name} errors={errors} />
      </div>
    </>
  );
};

export default NumberInput;
