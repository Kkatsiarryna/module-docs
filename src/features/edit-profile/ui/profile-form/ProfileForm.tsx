import Box from '@mui/material/Box'
import styles from './ProfileForm.module.scss'
import { Button, Input, PhotoUploader } from '@shared/ui'
import { useProfileForm } from '@features/edit-profile/model'
import { Controller } from 'react-hook-form'

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    isSubmitting,
    //submitError,
    control,
  } = useProfileForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Controller
        control={control}
        name="avatar"
        render={({ field: { onChange } }) => (
          <PhotoUploader onFileSelect={onChange} disabled={isSubmitting} />
        )}
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
        <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
          Сохранить
        </Button>
      </Box>
    </form>
  )
}
