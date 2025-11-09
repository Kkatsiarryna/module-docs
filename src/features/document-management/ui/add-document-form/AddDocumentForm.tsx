import { CreateForm, FileUploader, Input, Select } from '@shared/ui'
import { Controller } from 'react-hook-form'
import { roleDocsArray } from '@shared/model/user'
import { useAddDocumentForm } from '@features/document-management/model'
import styles from '@features/user-management/ui/add-user-form/AddUserForm.module.scss'
import Modal from '@mui/material/Modal'
import type { FormEvent } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const AddDocumentForm = ({ open, onClose, onSuccess }: Props) => {
  const {
    control,
    register,
    categoryOptions,
    handleSubmit,
    formState: { errors, isValid },
    isSubmitting,
  } = useAddDocumentForm()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Form submission started')

    handleSubmit(e)
      .then(() => {
        console.log('Document added successfully')
        if (onSuccess) {
          Promise.resolve(onSuccess()).then(() => {
            console.log('Data refetched')
            onClose()
          })
        } else {
          onClose()
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error)
      })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={styles.modal}
      aria-labelledby="add-document-modal"
    >
      <CreateForm
        title={'Добавление пользователя'}
        onSubmit={onSubmit}
        onCancel={onClose}
        disabled={!isValid || isSubmitting}
      >
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Категория документа *"
              selectItems={categoryOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="role_name"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Кому доступен документ *"
              selectItems={roleDocsArray}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Input label={'Название документа *'} {...register('title')} error={!!errors.title} />
        <Controller
          name="file_content"
          control={control}
          render={({ field: { onChange } }) => <FileUploader onFileSelect={onChange} />}
        />
      </CreateForm>
    </Modal>
  )
}
