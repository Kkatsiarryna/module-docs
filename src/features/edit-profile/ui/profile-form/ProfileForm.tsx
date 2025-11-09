import Box from '@mui/material/Box'
import styles from './ProfileForm.module.scss'
import { Button, ICONS, Input, Modal, PhotoUploader } from '@shared/ui'
import { useProfileForm } from '@features/edit-profile/model'
import { Controller } from 'react-hook-form'

export const ProfileForm = () => {
  const {
    register,
    handleSubmitName,
    formState: { errors, isValid },
    isSubmitting,
    //submitError,
    control,
    onAvatarChange,
    onDeleteAvatar,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
  } = useProfileForm()

  return (
    <form className={styles.form}>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (
          <PhotoUploader
            onFileSelect={file => {
              if (file) {
                onAvatarChange(file)
              }
            }}
            onDeleteClick={handleDeleteClick}
            currentImage={field.value}
            disabled={isSubmitting}
          />
        )}
      />
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        icon={ICONS.WARNING_OUTLINE}
        title={'Удалить фото'}
        textButtons={['Нет', 'Да']}
        onConfirm={onDeleteAvatar}
      />
      <Box className={styles.formGroup}>
        <Input
          label="Имя"
          required
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          {...register('firstname')}
        />
        <Input
          label="Фамилия"
          required
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          {...register('lastname')}
        />
        <Button
          variant="primary"
          // type="submit"
          onClick={handleSubmitName}
          disabled={!isValid || isSubmitting}
        >
          Сохранить
        </Button>
      </Box>
    </form>
  )
}
