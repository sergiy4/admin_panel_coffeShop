import { useGetOrdersQuery } from '../orderApi/orderApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import OrderItem from './OrderItem';
import Pagination from '../../../components/Pagination';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';

const OrderList = () => {
  let errorMessage;
  let loader;
  let content;
  let pagination;
  const [page, setPage] = useSearchParamsState('page', '1');

  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetOrdersQuery({ page: parseInt(page, 10) });

  if (isLoading || isFetching) {
    loader = <Loader />;
  } else if (isError) {
    console.log(error);
    let errorMessage = getQueryErrorMessage(error);
    content = <p className='error_message'>{errorMessage}</p>;
    if (parseInt(page, 10) > 1) {
      setPage('1');
    }
  } else if (isSuccess) {
    console.log(data);
    content = data?.orders?.map((order) => (
      <OrderItem {...order} key={order._id} />
    ));

    pagination = (
      <Pagination
        siblingCount={1}
        currentPage={parseInt(page, 10)}
        setPage={setPage}
        totalPageCount={data.totalPageCount}
      />
    );
    console.log(pagination);
  }

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
