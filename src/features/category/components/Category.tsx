import { Category } from '../types';
import { useState } from 'react';
import CategoryItem from './CategoryItem';
import CategoryUpdateForm from './CategoryUpdateForm';

const Category = (category: Category) => {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  return (
    <li>
      {edit ? (
        <CategoryUpdateForm {...category} toggleEdit={toggleEdit} />
      ) : (
        <CategoryItem {...category} toggleEdit={toggleEdit} />
      )}
    </li>
  );
};

export default Category;
