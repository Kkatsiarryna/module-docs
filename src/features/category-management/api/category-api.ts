import { baseApi } from '@shared/api'
import type {
  AddCategoryRequest,
  AddCategoryResponse,
  CategoriesResponse,
  DeleteCategoryResponse,
} from '@features/category-management/model'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<CategoriesResponse, void>({
      query: () => '/documents/categories',
      providesTags: ['Category'],
    }),
    addCategory: build.mutation<AddCategoryResponse, AddCategoryRequest>({
      query: data => ({
        url: '/documents/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: build.mutation<DeleteCategoryResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/documents/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } =
  categoryApi
