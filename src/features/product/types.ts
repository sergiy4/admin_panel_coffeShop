interface Product {
  id?: string;
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  availableQuantity: number;
}

interface GetProductsQueryArg {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

interface ProductQueryResult {
  products: Product[];
  numberOfPages: number;
}

export type { Product, GetProductsQueryArg, ProductQueryResult };
