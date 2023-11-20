import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <ProductList />
      <button onClick={(e) => navigate('/products/create')}>
        CREATE PRODUCT
      </button>
    </>
  );
};
export default Products;
