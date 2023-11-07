import { apiSlice } from '../../../app/api/apiSlice';
import { Order, GetOrdersQueryArg } from '../types';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], GetOrdersQueryArg>({
      query: ({ page, pageSize }) => ({
        url: '/orders',
        method: 'GET',
        params: { page, pageSize },
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
