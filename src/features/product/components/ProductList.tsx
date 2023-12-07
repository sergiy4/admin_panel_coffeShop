import { useGetProductsQuery } from '../productApi/productApi';
import { useState, useEffect } from 'react';
import QueryParameters from './QueryParameters';
import { useSearchParams } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import ProductItem from './ProductItem';
import Pagination from '../../../components/Pagination';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';

export interface ProductsParams {
  search?: string;
  rating?: string;
  category?: string;
  page?: number;
}

const ProductList = () => {
  let products;
  let loader;
  let content;
  let pagination;
  let errorMessage;

  const [page, setPage] = useSearchParamsState('page', '1');
  const [rating, setRating] = useSearchParamsState('rating', '');
  const [category, setCategory] = useSearchParamsState('category', '');
  const [search, setSearch] = useSearchParamsState('search', '');

  const { currentData, isSuccess, isError, error, isFetching, isLoading } =
    useGetProductsQuery({
      search,
      category,
      rating,
      page: parseInt(page, 10),
    });

  if (isFetching || isLoading) {
    loader = <Loader />;
  } else if (isSuccess) {
    console.log(currentData);

    if (currentData) {
      products = currentData.products.map((product) => (
        <ProductItem
          id={product._id}
          key={product._id}
          page={parseInt(page, 10)}
          urlProductParams={{
            search,
            category,
            rating,
            page: parseInt(page, 10),
          }}
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
          currentPage={parseInt(page, 10)}
          setPage={setPage}
          totalPageCount={currentData?.totalPageCount}
        />
      );
    }
  }

  useEffect(() => {
    if (isError) {
      console.log(error);
      let errorMessage = getQueryErrorMessage(error);
      content = <p className='error_message'>{errorMessage}</p>;
      if (parseInt(page, 10) > 1) {
        setPage('1');
      }
    }
  }, [isError]);

  return (
    <>
      <QueryParameters
        setRating={setRating}
        setCategory={setCategory}
        setSearch={setSearch}
        category={category}
        rating={rating}
        search={search}
      />
      {errorMessage ? <p>{errorMessage}</p> : null}
      {loader}
      {content}
      {pagination}
    </>
  );
};

export default ProductList;
