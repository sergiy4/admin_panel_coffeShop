import { apiSlice } from '../../../app/api/apiSlice';
import { CurrentProductStatistic, OverallStatistic } from '../types';

export const statisticApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentProductStatistic: builder.query<CurrentProductStatistic, string>({
      query: (productID) => ({
        url: `/statistics/${productID}`,
        method: 'GET',
      }),
    }),

    getOverallStatistic: builder.query<OverallStatistic, string>({
      query: (productID) => ({
        url: `/statistics/${productID}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCurrentProductStatisticQuery,
  useGetOverallStatisticQuery,
} = statisticApi;
