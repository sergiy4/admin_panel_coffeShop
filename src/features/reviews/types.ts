export interface Review {
  _id?: string;
  rating: number;
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
  rating?: string;
}

export type GetReviewsResult = {
  reviews: Review[];
  totalPageCount: number;
};
