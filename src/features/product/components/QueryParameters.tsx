import CategorySelect from './CategorySelect';
import DebounceInput from '../../../components/DebounceInput';
import RatingSelect from './RatingSelectInput';

type QueryParametersProps = {
  setRating: (newState: string) => void;
  setSearch: (newState: string) => void;
  setCategory: (newState: string) => void;
  category: string;
  rating: string;
  search: string;
};

const QueryParameters = ({
  setRating,
  setSearch,
  setCategory,
  category,
  rating,
  search,
}: QueryParametersProps) => {
  return (
    <>
      <CategorySelect category={category} setCategory={setCategory} />
      <RatingSelect rating={rating} setRating={setRating} />
      <DebounceInput search={search} setSearch={setSearch} />
    </>
  );
};

export default QueryParameters;
