import { useFormContext } from 'react-hook-form';
import InputErrorMessage from './InputErrorMessage';
import { InputProps } from '../types';

const FileInput = ({ label, name, errors, id }: InputProps) => {
  const form = useFormContext();
  const { register } = form;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type='file' multiple {...register(name)} />
      <div>
        <InputErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FileInput;
