import { useGetOrdersQuery } from '../orderApi/orderApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import OrderItem from './OrderItem';
import { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination';

const OrderList = () => {
  let errorMessage;
  let loader;
  let content;
  let pagination;
  const [page, setPage] = useState<number>(0);

  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetOrdersQuery({ page });

  if (isLoading || isFetching) {
    loader = <Loader />;
  } else if (isSuccess) {
    console.log(data);
    content = data?.orders?.map((order) => (
      <OrderItem {...order} key={order._id} />
    ));

    pagination = (
      <Pagination
        siblingCount={1}
        currentPage={page}
        setPage={setPage}
        totalPageCount={data.totalPageCount}
      />
    );
    console.log(pagination);
  }

  useEffect(() => {
    if (isError) {
      errorMessage = getQueryErrorMessage(error);
      // If error navigate to page one
      setPage(1);
    }
  }, [isError]);

  return (
    <>
      {loader}
      {errorMessage ? <p>{errorMessage}</p> : null}
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sum</th>
            <th>Bill</th>
            <th>UserID</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      {pagination}
    </>
  );
};

export default OrderList;
