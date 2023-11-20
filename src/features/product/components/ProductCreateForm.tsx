import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, ProductSchemaType } from '../schemas';
import FormInput from '../../../components/FormInput';
import ReactSelectInput from '../../../components/ReactSelectInput';
import NumberInput from '../../../components/NumberInput';
import FileInput from '../../../components/FileInput';
import { useCreateProductMutation } from '../productApi/productApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';

interface ProductCreateFormProps {
  options: {
    value: string;
    label: string;
  }[];
}
const ProductCreateForm = ({ options }: ProductCreateFormProps) => {
  let errorMessage;
  let successMessage;

  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [create, { data, isError, error, isSuccess, isLoading }] =
    useCreateProductMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('category', data.category.value);
      formData.append('price', data.price.toString());
      formData.append('description', data.description);
      formData.append('availableQuantity', data.availableQuantity.toString());
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
      await create(formData);
    } catch (err) {}
  });

  if (isLoading) {
  } else if (isError) {
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    successMessage = 'Product has been created successfully';
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            errors={errors}
            id="name"
            name="name"
            label="Name"
            type="text"
          />
          <ReactSelectInput
            errors={errors}
            isMulti={false}
            label="category"
            name="category"
            options={options}
          />
          <NumberInput
            errors={errors}
            label="Price"
            name="price"
            placeholder="100"
            type="number"
            id="price"
          />
          <FormInput
            errors={errors}
            id="description"
            name="description"
            label="Description"
            type="text"
          />
          <NumberInput
            id="availableQuantity"
            errors={errors}
            label="Available Quantity"
            name="availableQuantity"
            placeholder="100"
            type="number"
          />
          <FileInput errors={errors} name="images" label="images" id="images" />
          <button onClick={onSubmit} disabled={isLoading}>
            Create
          </button>
        </form>
      </FormProvider>
      <div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
      <div>{successMessage ? <p>{successMessage}</p> : null}</div>
    </>
  );
};

export default ProductCreateForm;
