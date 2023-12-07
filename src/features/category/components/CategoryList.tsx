import { useGetAllCategoriesQuery } from '../categoryApi/categoryApi';
import { isCustomErrorType } from '../../../utils/helpers';
import Category from './Category';
const CategoryList = () => {
  let content;
  const { data, isSuccess, isError, error } = useGetAllCategoriesQuery();

  if (isError) {
    if (isCustomErrorType(error)) {
      content = <p>{error?.data?.message}</p>;
    }
  } else if (isSuccess) {
    content = (
      <ul>
        {data.map((category) => (
          <Category {...category} key={category._id} />
        ))}
      </ul>
    );
  }

  return content;
};

export default CategoryList;
