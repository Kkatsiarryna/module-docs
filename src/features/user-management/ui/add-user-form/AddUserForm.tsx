import { CreateForm, Input, Select } from '@shared/ui'
import { rolesUsersArray } from '@shared/model/user'
import { useAddUserForm } from '@features/user-management/model'
import { Controller } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import styles from './AddUserForm.module.scss'

type Props = {
  open: boolean
  onClose: () => void
}

export const AddUserForm = ({ open, onClose }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    isSubmitting,
    control,
  } = useAddUserForm(onClose)

  return (
    <Modal open={open} onClose={onClose} className={styles.modal} aria-labelledby="add-user-modal">
      <CreateForm
        title={'Добавление пользователя'}
        onSubmit={handleSubmit}
        disabled={!isValid || isSubmitting}
        onCancel={onClose}
      >
        <Input
          label={'Имя *'}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          {...register('firstname')}
        />
        <Input
          label={'Фамилия *'}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          {...register('lastname')}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Роль *"
              selectItems={rolesUsersArray}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Input
          label={'Email *'}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </CreateForm>
    </Modal>
  )
}
