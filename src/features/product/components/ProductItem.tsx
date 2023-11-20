import DeleteButton from './DeleteButton';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../productApi/productApi';
import { EntityId } from '@reduxjs/toolkit';
import { ProductsParams } from './ProductList';

interface ProductItem {
  id: EntityId;
  page: number;
  urlProductParams: ProductsParams;
}
//
const ProductItem = ({ id, page, urlProductParams }: ProductItem) => {
  const navigate = useNavigate();
  const { product } = useGetProductsQuery(
    { ...urlProductParams, page },
    {
      selectFromResult: ({ currentData }) => {
        console.log(currentData);
        return {
          product: currentData?.products.find((product) => product._id === id),
        };
      },
    }
  );
  if (!product) {
    return (
      <tr>
        <td>Product not found</td>
      </tr>
    );
  }
  const {
    name,
    category,
    availableQuantity,
    price,
    _id,
    rating,
    quantityReview,
  } = product;
  return (
    <tr>
      <td>{name}</td>
      <td>{category}</td>
      <td>{availableQuantity}</td>
      <td>{price}</td>
      <td>{rating}</td>
      <td>{quantityReview}</td>
      <td>
        <DeleteButton id={_id} />
        {/* TODO: add update button */}
        <button onClick={() => navigate(`/products/${_id}`)}>UPDATE</button>
      </td>
    </tr>
  );
};

export default ProductItem;
