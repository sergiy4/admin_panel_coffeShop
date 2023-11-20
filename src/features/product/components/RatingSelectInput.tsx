import ReactSelect, { SingleValue } from 'react-select';
import { RATING_PARAMS } from '../data/productRatingParams';
import { SetURLSearchParams } from 'react-router-dom';
import { addUrlParameter } from '../../../utils/addUrlParameter';
import { deleteUrlParameter } from '../../../utils/deleteUrlParams';

interface RatingSelectProps {
  rating?: string;
  setRating: (value: string) => void;
  setSearchParams: SetURLSearchParams;
}

const RatingSelect = ({
  rating,
  setRating,
  setSearchParams,
}: RatingSelectProps) => {
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
    if (!selectedOption?.value) {
      const urlWithDeletedRatingParams = deleteUrlParameter('rating');
      setSearchParams(urlWithDeletedRatingParams);
      setRating('');
    } else if (selectedOption?.value) {
      // set the value in url
      const urlWithUpdatedRatingParams = addUrlParameter(
        'rating',
        selectedOption?.value
      );
      setSearchParams(urlWithUpdatedRatingParams);
      // set State
      setRating(selectedOption?.value);
    }
  };

  return (
    <>
      <label htmlFor="rating">RATING</label>
      <ReactSelect
        // check if there is a value in the url
        // if so, we set it as the default value
        defaultValue={rating ? { value: rating, label: rating } : null}
        id="rating"
        options={ratingOptions}
        onChange={handleRatingChange}
      />
    </>
  );
};

export default RatingSelect;
