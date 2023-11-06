import { apiSlice } from '../../../app/api/apiSlice';
import { User } from '../../auth/types';
export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query<User[], unknown>({
      query: () => ({
        url: '/team',
        method: 'GET',
      }),
      providesTags: ['Team'],
    }),
    updateTeamMember: builder.mutation<User, User>({
      query: (credentials) => ({
        url: '/team',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Team'],
    }),
  }),
});
