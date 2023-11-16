import { Fragment } from 'react';
import { Order } from '../types';

const OrderItem = ({ bill, orderItems, userID, _id }: Order) => {
  let rowCount = orderItems.length;

  let productItems = orderItems.map((orderItem, index) => (
    <tr key={orderItem._id}>
      {index === 0 && <td rowSpan={rowCount}>{_id}</td>}
      <td>{orderItem.name}</td>
      <td>{orderItem.price}</td>
      <td>{orderItem.quantity}</td>
      <td>{orderItem.price * orderItem.quantity}</td>
      {index === 0 && (
        <>
          <td rowSpan={orderItems.length}>{bill}</td>
          <td rowSpan={orderItems.length}>{userID}</td>
        </>
      )}
    </tr>
  ));

  return <>{productItems}</>;
};
export default OrderItem;
{
  /* <td rowSpan={rowCount}>BILL</td> */
}
