import { Review } from '../types';
import { useDeleteReviewMutation } from '../reviewsApi/reviewsApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import useToastMessages from '../../../hooks/useToastMessage';
import { QueryError } from '../../../utils/getQueryErrorMessage';
const ReviewCard = ({
  comment,
  email,
  name,
  rating,
  _id,
  productID,
}: Review) => {
  const [notifySuccess, notifyError] = useToastMessages();
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const handleDelete = async () => {
    try {
      await deleteReview({ productID, reviewID: _id }).unwrap();
      notifySuccess('Review successfully deleted');
    } catch (err) {
      console.log(err);
      let errorMessage = getQueryErrorMessage(err as QueryError);
      notifyError(errorMessage);
    }
  };

  return (
    <article>
      <div>
        <h4>Rating: {rating}</h4>
        <h4>
          {email} {name}
        </h4>
        <p>{comment}</p>
      </div>
      <button disabled={isLoading} onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
};

export default ReviewCard;
