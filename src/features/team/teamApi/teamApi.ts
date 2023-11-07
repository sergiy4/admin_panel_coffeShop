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
      query: ({ name, surname, email, city, country, role, id }) => ({
        url: `/team/${id}`,
        method: 'POST',
        body: {
          name,
          surname,
          email,
          city,
          country,
          role,
        },
      }),
      invalidatesTags: ['Team'],
    }),

    deleteTeamMember: builder.mutation<{ data: { mAessage: string } }, string>({
      query: (id) => ({
        url: `/team/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Team'],
    }),
  }),
});

export const {
  useDeleteTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useGetTeamQuery,
} = teamApi;
