import { getUrlPageNumber } from '../../../utils/getUrlPageNumber';
import { useGetOrdersQuery } from '../orderApi/orderApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import OrderItem from './OrderItem';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Pagination from '../../../components/Pagination';

const OrderList = () => {
  let errorMessage;
  let loader;
  let content;
  let pagination;
  const page = getUrlPageNumber();
  const navigate = useNavigate();

  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetOrdersQuery({ page });

  if (isLoading || isFetching) {
    loader = <Loader />;
  } else if (isSuccess) {
    content = data?.orders?.map((order) => (
      <OrderItem {...order} key={order._id} />
    ));

    pagination = (
      <Pagination
        siblingCount={1}
        currentPage={page}
        path="/orders"
        totalPageCount={data.totalPageCount}
      />
    );
    console.log(pagination);
  }

  useEffect(() => {
    if (isError) {
      errorMessage = getQueryErrorMessage(error);
      // If error navigate to page one
      navigate('/orders?page=1');
    }
  }, [isError]);

  return (
    <>
      {loader}
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
