import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, ProductSchemaType } from '../schemas';
import ReactSelectInput from '../../../components/ReactSelectInput';
import NumberInput from '../../../components/NumberInput';
import FileInput from '../../../components/FileInput';
import { useUpdateProductMutation } from '../productApi/productApi';
import getQueryErrorMessage, {
  QueryError,
} from '../../../utils/getQueryErrorMessage';
import FormInput from '../../../components/FormInput';
import { Product } from '../types';
import { useLocation, useParams } from 'react-router-dom';
import useToastMessages from '../../../hooks/useToastMessage';

type UpdateFormProps = {
  categoryOptions: {
    value: string;
    label: string;
  }[];
};

const UpdateForm = ({ categoryOptions }: UpdateFormProps) => {
  const [notifySuccess, notifyError] = useToastMessages();
  const { state } = useLocation() as unknown as { state: Product };
  const { productID } = useParams();

  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [update, { isLoading }] = useUpdateProductMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      console.log(productID);
      formData.append('id', productID || '');
      formData.append('category', data.category.value);
      formData.append('price', data.price.toString());
      formData.append('description', data.description);
      formData.append('availableQuantity', data.availableQuantity.toString());
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      console.log(formData.get('id'));
      await update(formData).unwrap();
      notifySuccess('Product has been updated successfully');
    } catch (err) {
      let errorMessage = getQueryErrorMessage(err as QueryError);
      notifyError(errorMessage);
      console.log(err);
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            errors={errors}
            id='name'
            name='name'
            label='Name'
            type='text'
            defaultValue={state.name}
          />
          <ReactSelectInput
            errors={errors}
            label='category'
            name='category'
            options={categoryOptions}
            defaultOptions={{
              label: state.category.name,
              value: state.category._id,
            }}
          />
          <NumberInput
            errors={errors}
            label='Price'
            name='price'
            placeholder='100'
            type='number'
            id='price'
            defaultValue={state.price}
          />
          <FormInput
            errors={errors}
            id='description'
            name='description'
            label='Description'
            type='text'
            defaultValue={state.description}
          />
          <NumberInput
            id='availableQuantity'
            errors={errors}
            label='Available Quantity'
            name='availableQuantity'
            placeholder='100'
            type='number'
            defaultValue={state.availableQuantity}
          />
          <FileInput errors={errors} name='images' label='images' id='images' />
          <button onClick={onSubmit} disabled={isLoading}>
            Update
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default UpdateForm;
