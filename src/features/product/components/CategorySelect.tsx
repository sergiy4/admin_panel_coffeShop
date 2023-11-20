import ReactSelect, { SingleValue } from 'react-select';
import { useGetAllCategoriesQuery } from '../../category/categoryApi/categoryApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { SetURLSearchParams } from 'react-router-dom';
import { addUrlParameter } from '../../../utils/addUrlParameter';
import { deleteUrlParameter } from '../../../utils/deleteUrlParams';

interface QueryArgProps {
  category?: string;
  setCategory: (value: string) => void;
  setSearchParams: SetURLSearchParams;
}

const CategorySelect = ({
  category,
  setCategory,
  setSearchParams,
}: QueryArgProps) => {
  let defaultCategory;
  let categoryOptions;
  let errorMessage = null;

  const { data, isSuccess, isError, error } = useGetAllCategoriesQuery();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    // set category options
    categoryOptions = data.map((category) => ({
      value: category._id,
      label: category.name,
    }));
    categoryOptions.push({ value: '', label: 'WITHOUT CATEGORY' });

    // found default value for category
    if (category) {
      // we find the initial value from url
      const foundCategory = data.find((item) => item._id === category);

      if (foundCategory) {
        // if it exists, set it as default
        defaultCategory = {
          value: foundCategory._id,
          label: foundCategory.name,
        };
      }
    }
  }

  const handleCategoryChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (!selectedOption?.value) {
      // get url without category parameter
      const urlWithDeletedCategoryParams = deleteUrlParameter('category');
      // then set this url
      setSearchParams(urlWithDeletedCategoryParams);
      setCategory('');
    } else if (selectedOption?.value) {
      // get url with category parameter
      const urlWithUpdatedCategoryParams = addUrlParameter(
        'category',
        selectedOption?.value
      );
      // set this url
      setSearchParams(urlWithUpdatedCategoryParams);
      setCategory(selectedOption?.value);
    }
  };

  return (
    <>
      {isSuccess ? (
        <>
          <label htmlFor="category">CATEGORY</label>
          <ReactSelect
            id="category"
            defaultValue={defaultCategory}
            options={categoryOptions}
            onChange={handleCategoryChange}
          />
        </>
      ) : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default CategorySelect;
