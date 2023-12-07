import ReactSelect, { SingleValue } from 'react-select';
import { RATING_PARAMS } from '../data/productRatingParams';

interface RatingSelectProps {
  rating?: string;
  setRating: (value: string) => void;
}

const RatingSelect = ({ rating, setRating }: RatingSelectProps) => {
  // set rating options
  let ratingOptions = RATING_PARAMS.map((ratingParams) => ({
    value: ratingParams,
    label: ratingParams,
  }));
  // add empty option
  ratingOptions.push({ value: '', label: 'without rating' });

  const handleRatingChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    // if the value does not exist, or it is an empty string,
    // and it is also present in the url parameter
    if (selectedOption?.value) {
      setRating(selectedOption?.value);
    } else {
      setRating('');
    }
  };

  return (
    <>
      <label htmlFor='rating'>RATING</label>
      <ReactSelect
        // check if there is a value in the url
        // if so, we set it as the default value
        defaultValue={rating ? { value: rating, label: rating } : null}
        id='rating'
        options={ratingOptions}
        onChange={handleRatingChange}
      />
    </>
  );
};

export default RatingSelect;
