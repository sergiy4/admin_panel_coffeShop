export interface ProductItem {
  _id?: string;
  productID: string;
  name: string;
  price: number;
  images: string;
  quantity: number;
}

export interface Order {
  _id?: string;
  orderItems: ProductItem[];
  bill: number;
  userID: string;
}

export interface OrdersQueryResult {
  orders: Order[];
  totalPageCount: number;
}
export interface GetOrdersQueryArg {
  page?: number;
  pageSize?: number;
}
