import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ProfileFormData, profileSchema } from '@features/edit-profile/model'
import { useUpdateProfileMutation } from '@features/edit-profile/api'

export const useProfileForm = () => {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation()

  const form = useForm<ProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      avatar: undefined,
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data)
    try {
      const userId = '12345'

      const formData = new FormData()
      formData.append('firstname', data.firstname)
      formData.append('lastname', data.lastname)
      if (data.avatar instanceof File) {
        formData.append('avatar', data.avatar)
      }

      await updateProfile({ id: userId, data: formData }).unwrap()
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isLoading,
    submitError: error,
  }
}
