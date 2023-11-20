import { apiSlice } from '../../../app/api/apiSlice';
import {
  EntityState,
  createEntityAdapter,
  // createSelector,
} from '@reduxjs/toolkit';
import {
  Product,
  GetProductsQueryArg,
  ProductQueryResult,
  ProductCreateArg,
} from '../types';

// const productAdapter = createEntityAdapter<Product>({
//   sortComparer: (a, b) => a.name.localeCompare(b.name),
// });

// const initialState = productAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // EntityState<Product>
    getProducts: builder.query<ProductQueryResult, GetProductsQueryArg>({
      query: ({ page, pageSize, category, search }) => ({
        url: '/products',
        method: 'GET',
        params: { page, pageSize, category, search },
      }),
      // transformResponse: (result: ProductQueryResult): EntityState<Product> => {
      //   const loadedProducts = result?.products?.map((product) => {
      //     product.id = product._id;
      //     return product;
      //   });

      //   return productAdapter.setAll(initialState, loadedProducts);
      // },

      providesTags: (result) => {
        if (result) {
          return [
            { type: 'Product', id: 'LIST' },
            ...result.products.map((product) => ({ type: 'Product' as const, id: product._id })),
          ];
        } else return [{ type: 'Product', id: 'LIST' }];
      },
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
} = productsApiSlice;
