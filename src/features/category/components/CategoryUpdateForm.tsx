import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, CategorySchemaType } from '../schemas';
import { useUpdateCategoryMutation } from '../categoryApi/categoryApi';
import { Category } from '../types';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useEffect } from 'react';

interface CategoryUpdateFormProps extends Category {
  toggleEdit: () => void;
}

const CategoryUpdateForm = ({
  name,
  _id,
  toggleEdit,
}: CategoryUpdateFormProps) => {
  let ErrorMessage;

  // methods from react-hook-form
  const methods = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // rtk query
  const [update, { isLoading, isSuccess, isError, error }] =
    useUpdateCategoryMutation();

  //Submit handler
  const onSubmit = handleSubmit(async (data) => {
    await update({ ...data, _id });
  });

  if (isError) {
    ErrorMessage = getQueryErrorMessage(error);
  }

  useEffect(() => {
    if (isSuccess) {
      toggleEdit();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            errors={errors}
            id="category"
            label="Update category"
            name="name"
            type="text"
            defaultValue={name}
          />
          {/* TODO: add icon */}
          <button onClick={onSubmit} disabled={isLoading}>
            Save
          </button>
        </form>
      </FormProvider>
      {/* TODO: add icon */}
      <button onClick={toggleEdit} disabled={isLoading}>
        Cancel
      </button>
      {ErrorMessage ? <p>{ErrorMessage}</p> : null}
    </>
  );
};

export default CategoryUpdateForm;
