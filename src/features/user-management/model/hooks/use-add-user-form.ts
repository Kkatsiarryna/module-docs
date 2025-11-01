import { useForm } from 'react-hook-form'
import { ADD_USER_SCHEMA, type AddUserFormData } from '@features/user-management/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddUserMutation } from '@features/user-management/api/user-api.ts'
import { useApiError } from '@shared/model/hooks'

export const useAddUserForm = (onSuccess?: () => void) => {
  const [addUser, { isLoading, error }] = useAddUserMutation()
  const { handleApiError } = useApiError()

  const form = useForm<AddUserFormData>({
    mode: 'onChange',
    resolver: zodResolver(ADD_USER_SCHEMA),
    defaultValues: {
      firstname: '',
      lastname: '',
      role: undefined,
      email: '',
    },
  })

  const onSubmit = async (data: AddUserFormData) => {
    try {
      await addUser(data).unwrap()
      onSuccess?.()
    } catch (error) {
      handleApiError(error)
    }
  }

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isLoading,
    submitError: error,
  }
}
