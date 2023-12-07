import { Review } from '../types';

const ReviewCard = ({ comment, email, name, rating, userID }: Review) => {
  return (
    <article>
      <div>
        <h4>Rating: {rating}</h4>
        <h4>
          {email} {name}
        </h4>
        <p>{comment}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
