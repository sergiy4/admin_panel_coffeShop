import { apiSlice } from '../../../app/api/apiSlice';
import { Review, GetReviewsQueryArg, GetReviewsResult } from '../types';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsReviews: builder.query<GetReviewsResult, GetReviewsQueryArg>({
      query: ({ productID, page, pageSize, rating }) => ({
        url: `/products/${productID}/reviews`,
        method: 'GET',
        params: { page, pageSize, rating },
      }),
      providesTags: ['Review'],
    }),

    deleteReview: builder.mutation({
      query: ({ productID, reviewID }) => ({
        url: `/products/${productID}/reviews${reviewID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const { useGetProductsReviewsQuery, useDeleteReviewMutation } =
  reviewsApi;
