import { Controller, useFormContext } from 'react-hook-form';
import { ReactSelectProps } from '../types';
import ReactSelect from 'react-select';
import InputErrorMessage from './InputErrorMessage';

export const ReactSelectInput = ({
  name,
  label,
  errors,
  options,
  isMulti,
}: ReactSelectProps) => {
  const { control } = useFormContext();
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <ReactSelect
            isMulti={isMulti}
            onChange={onChange}
            options={options}
            classNames={{
              control: (state) =>
                `form__input py-[2.5px]  ${
                  Object.prototype.hasOwnProperty.call(errors, name) &&
                  !state.isFocused &&
                  '!border-2 !border-red-500'
                } `,
            }}
          />
        )}
      />
      <div>
        <InputErrorMessage name={name} errors={errors} />
      </div>
    </>
  );
};

export default ReactSelectInput;
