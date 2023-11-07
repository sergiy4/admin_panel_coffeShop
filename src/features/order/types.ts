export interface ProductItem {
  productID: string;
  name: string;
  price: number;
  images: string;
  quantity: number;
}

export interface Order {
  orderItems: ProductItem[];
  bill: number;
  userID: string;
}

export interface GetOrdersQueryArg {
  page?: number;
  pageSize?: number;
}
