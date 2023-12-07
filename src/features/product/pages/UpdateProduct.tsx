import UpdateForm from '../components/ProductUpdateForm';
import { useGetAllCategoriesQuery } from '../../category/categoryApi/categoryApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';

const UpdateProduct = () => {
  let content;

  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetAllCategoriesQuery();

  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    const options = data.map((category) => ({
      value: category._id,
      label: category.name,
    }));

    content = <UpdateForm categoryOptions={options} />;
  }

  return <>{content}</>;
};

export default UpdateProduct;
