import { useForm, FormProvider } from 'react-hook-form';
import { useCreateCategoryMutation } from '../categoryApi/categoryApi';
import FormInput from '../../../components/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, CategorySchemaType } from '../schemas';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';

const CategoryForm = () => {
  let errorMessage;
  const methods = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [create, { isError, error, isLoading }] = useCreateCategoryMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await create(data.name);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            errors={errors}
            id="category"
            label="Create category"
            name="name"
            type="text"
          />
        </form>
        {/* TODO:add icon */}
        <button onClick={onSubmit} disabled={isLoading}>
          Create
        </button>
      </FormProvider>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default CategoryForm;
