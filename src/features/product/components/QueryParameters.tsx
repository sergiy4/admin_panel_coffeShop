import CategorySelect from './CategorySelect';
import DebounceInput from '../../../components/DebounceInput';
import RatingSelect from './RatingSelectInput';
import { ProductsParams } from './ProductList';
import { SetURLSearchParams } from 'react-router-dom';

interface QueryParametersProps {
  urlProductParams: ProductsParams;
  setUrlProductParams: React.Dispatch<React.SetStateAction<ProductsParams>>;
  setSearchParams: SetURLSearchParams;
}
const QueryParameters = ({
  setUrlProductParams,
  setSearchParams,
  urlProductParams,
}: QueryParametersProps) => {
  const setRating = (value: string) => {
    setUrlProductParams({
      ...urlProductParams,
      rating: value,
    });
  };

  const setSearch = (value: string) => {
    setUrlProductParams({
      ...urlProductParams,
      search: value,
    });
  };

  const setCategory = (value: string) => {
    setUrlProductParams({
      ...urlProductParams,
      category: value,
    });
  };
  return (
    <>
      <CategorySelect
        category={urlProductParams.category}
        setCategory={setCategory}
        setSearchParams={setSearchParams}
      />
      <RatingSelect
        rating={urlProductParams.rating}
        setRating={setRating}
        setSearchParams={setSearchParams}
      />
      <DebounceInput
        search={urlProductParams.search}
        setSearch={setSearch}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export default QueryParameters;
