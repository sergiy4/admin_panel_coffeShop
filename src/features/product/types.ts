interface Product {
  id?: string;
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  availableQuantity: number;
  rating: number;
  quantityReview: number;
}

interface GetProductsQueryArg {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

interface ProductQueryResult {
  products: Product[];
  totalPageCount: number;
}

interface ProductCreateArg {
  name: string;
  category: string;
  price: number;
  images: FileList;
  description: string;
  availableQuantity: number;
}

export type {
  Product,
  GetProductsQueryArg,
  ProductQueryResult,
  ProductCreateArg,
};
