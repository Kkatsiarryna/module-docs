import { CreateForm, FileUploader, Input, Select } from '@shared/ui'
import { Controller } from 'react-hook-form'
import { roleDocsArray } from '@shared/model/user'
import { useAddDocumentForm } from '@features/document-management/model'

export const AddDocumentForm = () => {
  const {
    control,
    register,
    categoryOptions,
    handleSubmit,
    formState: { errors, isValid },
    isSubmitting,
  } = useAddDocumentForm()

  return (
    <CreateForm
      title={'Добавление пользователя'}
      onSubmit={handleSubmit}
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
  )
}
