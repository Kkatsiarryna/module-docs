export type Category = {
  id: number
  name: string
}

export type CategoriesResponse = {
  data: {
    categories: Category[]
  }
}

export type AddCategoryResponse = {
  data: Category
}

export type AddCategoryRequest = {
  name: string
}

export interface DeleteCategoryResponse {
  data: {
    message: string
    success: boolean
  }
}
