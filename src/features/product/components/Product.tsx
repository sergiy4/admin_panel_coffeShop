import { useGetCurrentProductQuery } from '../productApi/productApi';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  let content;
  let updateButton;
  const navigate = useNavigate();
  const { productID } = useParams();
  const { isError, isFetching, isLoading, isSuccess, data, error } =
    useGetCurrentProductQuery(productID || '');

  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    console.log(data);
    content = (
      <section>
        {data.images.map((image) => (
          <img
            key={image}
            src={`${import.meta.env.VITE_BASE_IMG_URL}${image}`}
          />
        ))}
        <h2>{data.name}</h2>
        <h3>Price: {data.price}</h3>
        <h3>Category: {data.category.name}</h3>
        <h3>Available quantity: {data.availableQuantity}</h3>
        <h3>Rating: {data.rating}</h3>
        <h3>Quantity review: {data.quantityReview}</h3>
        <h3>Description:</h3>
        <p> {data.description}</p>
      </section>
    );

    updateButton = (
      <button
        onClick={() => {
          navigate(`/products/${data._id}/update`, { state: data });
        }}
      >
        Update
      </button>
    );
  }

  return (
    <section>
      <section>{updateButton}</section>
      <section>{content}</section>
      <section>{}</section>
    </section>
  );
};

export default Product;
