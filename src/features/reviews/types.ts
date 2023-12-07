export interface Review {
  id?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  name: string;
  email: string;
  userID: string;
  productID: string;
}

export interface GetReviewsQueryArg {
  productID: string;
  page?: number;
  pageSize?: number;
  rating?: 1 | -1;
}
