import { useParams } from 'react-router-dom';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { useGetProductsReviewsQuery } from '../reviewsApi/reviewsApi';
import Loader from '../../../components/Loader';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Pagination from '../../../components/Pagination';
import ReviewCard from './ReviewCard';
import RatingSelect from '../../product/components/RatingSelectInput';

const ProductReviews = () => {
  let loader;
  let content;
  let pagination;
  const { productID } = useParams();
  const [page, setPage] = useSearchParamsState('page', '1');
  const [rating, setRating] = useSearchParamsState('rating', '');

  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetProductsReviewsQuery({
      page: parseInt(page, 10),
      rating,
      productID: productID || '',
    });

  if (isLoading || isFetching) {
    loader = <Loader />;
  } else if (isError) {
    console.log(error);
    let errorMessage = getQueryErrorMessage(error);
    content = <p className='error_message'>{errorMessage}</p>;
    if (parseInt(page, 10) > 1) {
      setPage('1');
    }
  } else if (isSuccess) {
    console.log(data);
    content = data.reviews.map((review) => (
      <ReviewCard key={review._id} {...review} />
    ));

    pagination = (
      <Pagination
        siblingCount={1}
        currentPage={parseInt(page, 10)}
        setPage={setPage}
        totalPageCount={data.totalPageCount}
      />
    );
    console.log(pagination);
  }

  return (
    <>
      <section>
        <RatingSelect rating={rating} setRating={setRating} />
        {loader}
        {content}
        <footer>{pagination}</footer>
      </section>
    </>
  );
};

export default ProductReviews;
