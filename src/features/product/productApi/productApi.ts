import { apiSlice } from '../../../app/api/apiSlice';

import {
  Product,
  GetProductsQueryArg,
  ProductQueryResult,
} from '../types';



export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // EntityState<Product>
    getProducts: builder.query<ProductQueryResult, GetProductsQueryArg>({
      query: ({ page, pageSize, category, search }) => ({
        url: '/products',
        method: 'GET',
        params: { page, pageSize, category, search },
      }),
      // providesTags: (result) => {
      //   if (result) {
      //     return [
      //       { type: 'Product', id: 'LIST' },
      //       ...result.products.map((product) => ({ type: 'Product' as const, id: product._id })),
      //     ];
      //   } else return [{ type: 'Product', id: 'LIST' }];
      // },
      providesTags:['Product']
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: `/products/${formData.get('id')}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<  { data: { message: string } } , string >({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    getCurrentProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCurrentProductQuery,
  useUpdateProductMutation
} = productsApiSlice;
