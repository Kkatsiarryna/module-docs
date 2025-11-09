import { useForm } from 'react-hook-form'
import { ADD_DOCUMENT_SCHEMA, type AddDocumentFormData } from '@features/document-management/model'
import { useAddDocumentMutation } from '@features/document-management/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCategoriesQuery } from '@features/category-management/api'
import { useMemo } from 'react'
import type { Category } from '@features/category-management/model'
import { useToast } from '@app/providers/toast'

export const useAddDocumentForm = (onSuccess?: () => void) => {
  const [addDocument, { isLoading, error }] = useAddDocumentMutation()
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery()
  const { showToast } = useToast()

  const form = useForm<AddDocumentFormData>({
    mode: 'onChange',
    resolver: zodResolver(ADD_DOCUMENT_SCHEMA),
    defaultValues: {
      category_id: '',
      role_name: undefined,
      title: '',
      file_content: undefined,
    },
  })

  const categoryOptions = useMemo(() => {
    if (!categoriesData?.data?.categories) return []

    return categoriesData.data.categories.map((category: Category) => ({
      value: category.id.toString(),
      label: category.name,
    }))
  }, [categoriesData])

  const onSubmit = async (formData: AddDocumentFormData) => {
    try {
      const data = new FormData()

      data.append('category_id', formData.category_id)
      data.append('role_name', formData.role_name)
      data.append('title', formData.title)

      if (formData.file_content) {
        data.append('file_content', formData.file_content)
      }

      await addDocument({ data }).unwrap()
      form.reset()
      onSuccess?.()
      showToast('Документ успешно добавлен', 'success')
    } catch {
      showToast('Неизвестная ошибка', 'error')
    }
  }

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isLoading,
    submitError: error,
    categoryOptions,
    isCategoriesLoading,
  }
}
