import { useGetProductsQuery } from '../productApi/productApi';
import { useState, useEffect } from 'react';
import QueryParameters from './QueryParameters';
import { useSearchParams } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import ProductItem from './ProductItem';
import Pagination from '../../../components/Pagination';

export interface ProductsParams {
  search?: string;
  rating?: string;
  category?: string;
}

const ProductList = () => {
  console.log('Product RENDER');
  let products;
  let loader;
  let content;
  let pagination;
  let [searchParams, setSearchParams] = useSearchParams();
  let errorMessage = null;

  const [urlProductParams, setUrlProductParams] = useState<ProductsParams>({});
  const [page, setPage] = useState<number>(1);

  const { currentData, isSuccess, isError, error, isFetching, isLoading } =
    useGetProductsQuery({ ...urlProductParams, page });

  if (isFetching || isLoading) {
    loader = <Loader />;
  }
  if (isError) {
    errorMessage = getQueryErrorMessage(error);
    console.log(error);
  } else if (isSuccess) {
    console.log(currentData);
    if (currentData) {
      products = currentData.products.map((product) => (
        <ProductItem
          id={product._id}
          key={product._id}
          page={page}
          urlProductParams={urlProductParams}
        />
      ));
    }
    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Available Quantity</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Quantity Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </table>
    );
    if (currentData?.totalPageCount) {
      pagination = (
        <Pagination
          siblingCount={1}
          currentPage={page}
          setPage={setPage}
          totalPageCount={currentData?.totalPageCount}
        />
      );
    }
  }

  useEffect(() => {
    let searchValue = searchParams.get('search');
    let categoryValue = searchParams.get('category');
    let ratingValue = searchParams.get('rating');
    let pageValue = searchParams.get('page');

    setUrlProductParams({
      ...(searchValue !== null && { search: searchValue }),
      ...(categoryValue !== null && { category: categoryValue }),
      ...(ratingValue !== null && { rating: ratingValue }),
    });

    try {
      if (typeof pageValue === 'string') {
        const p = parseInt(pageValue, 10);
        setPage(p);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <QueryParameters
        setSearchParams={setSearchParams}
        urlProductParams={urlProductParams}
        setUrlProductParams={setUrlProductParams}
      />
      {errorMessage ? <p>{errorMessage}</p> : null}
      {loader}
      {content}
      {pagination}
    </>
  );
};

export default ProductList;
