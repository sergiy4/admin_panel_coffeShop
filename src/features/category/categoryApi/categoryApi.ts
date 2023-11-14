import { apiSlice } from '../../../app/api/apiSlice';
import { Category, QueryMessageResponse } from '../types';

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: 'categories',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    createCategory: builder.mutation<Category, string>({
      query: (name) => ({
        url: 'categories',
        method: 'POST',
        body: {
          name,
        },
      }),
      invalidatesTags: ['Category'],
    }),

    updateCategory: builder.mutation<Category, Category>({
      query: ({ name, _id }) => ({
        url: `categories/${_id}`,
        method: 'PATCH',
        body: {
          name,
        },
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategory: builder.mutation<unknown, string>({
      query: (_id) => ({
        url: `categories/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categorySlice;
