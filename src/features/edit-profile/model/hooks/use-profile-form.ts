import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PROFILE_SCHEMA, type ProfileFormData } from '@features/edit-profile/model'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from '@features/edit-profile/api'
import { useAppSelector } from '@app/store'
import { selectUser } from '@features/auth/model'
import { useToast } from '@app/providers/toast'
import { useState } from 'react'

export const useProfileForm = () => {
  const [updateProfile, { isLoading: profileLoading, error: errorProfile }] =
    useUpdateProfileMutation()
  const [updateAvatar, { isLoading: avatarLoading, error: errorAvatar }] = useUpdateAvatarMutation()
  const [deleteAvatar, { isLoading: deleteLoading }] = useDeleteAvatarMutation()
  const user = useAppSelector(selectUser)
  const { showToast } = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const form = useForm<ProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(PROFILE_SCHEMA),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      avatar: user?.avatar ?? null,
    },
  })

  const onSubmitName = async (data: Pick<ProfileFormData, 'firstname' | 'lastname'>) => {
    if (!user?.id) return

    try {
      await updateProfile({
        id: user.id,
        data: {
          first_name: data.firstname,
          last_name: data.lastname,
        },
      }).unwrap()
      showToast('Данные профиля успешно обновлены', 'success')
    } catch {
      showToast('Неизвестная ошибка', 'error')
    }
  }

  const onAvatarChange = async (file: File | undefined) => {
    if (!file || !user?.id) return

    try {
      const result = await updateAvatar({ id: user.id, avatar: file }).unwrap()
      form.setValue('avatar', result.avatar ?? null)
      showToast('Данные профиля успешно обновлены', 'success')
    } catch {
      showToast('Неизвестная ошибка', 'error')
      form.setValue('avatar', user?.avatar ?? null)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const onDeleteAvatar = async () => {
    if (!user?.id) return
    try {
      await deleteAvatar(user.id).unwrap()
      form.setValue('avatar', null)
      showToast('Фото удалено')
    } catch {
      showToast('Неизвестная ошибка', 'error')
    }
  }

  return {
    ...form,
    user,
    handleSubmitName: form.handleSubmit(onSubmitName),
    onAvatarChange,
    onDeleteAvatar,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
    isSubmitting: profileLoading || avatarLoading || deleteLoading,
    submitError: errorProfile || errorAvatar,
  }
}
