import { useForm } from 'react-hook-form'
import {
  ADD_USER_SCHEMA,
  type AddUserFormData,
  type AddUserRequest,
} from '@features/user-management/model'
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
      const requestData: AddUserRequest = {
        email: data.email,
        first_name: data.firstname,
        last_name: data.lastname,
        role_name: data.role,
      }

      await addUser(requestData).unwrap()
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
