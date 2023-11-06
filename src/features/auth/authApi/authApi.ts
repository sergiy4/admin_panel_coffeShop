import { apiSlice } from '../../../app/api/apiSlice';
import { User, LoginCredentials, UserInfo } from '../types';
import { setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, User>({
      query: (credentials) => ({
        url: '/auth/signUp',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<UserInfo, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, userID } = data;
          dispatch(setCredentials({ accessToken, userID }));

          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;
