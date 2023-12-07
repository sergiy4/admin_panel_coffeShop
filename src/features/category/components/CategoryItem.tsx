import { Category } from '../types';
import { useDeleteCategoryMutation } from '../categoryApi/categoryApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
interface CategoryItemProps extends Category {
  toggleEdit: () => void;
}
const CategoryItem = ({ name, _id, toggleEdit }: CategoryItemProps) => {
  let errorMessage;
  const [remove, { isError, error, isLoading }] = useDeleteCategoryMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }

  return (
    <>
      <div>
        <p>{name}</p>
        {/* TODO: add icon */}
        <button onClick={toggleEdit} disabled={isLoading}>
          Edit
        </button>
        {/* TODO: add delete btn */}
        <button
          onClick={() => {
            if (_id) {
              remove(_id);
            }
          }}
          disabled={isLoading}
        >
          Delete
        </button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </div>
    </>
  );
};

export default CategoryItem;
