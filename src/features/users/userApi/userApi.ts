import { unwrapResult } from '@reduxjs/toolkit';
import { apiSlice } from '../../../app/api/apiSlice';
import { User } from '../../auth/types';
import { GetUsersQueryArgs } from '../types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], GetUsersQueryArgs>({
      query: ({ page, pageSize, search, city, country }) => ({
        url: 'users',
        params: { page, pageSize, search, city, country },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
