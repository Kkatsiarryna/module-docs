import { CreateForm, FileUploader, Input, Select } from '@shared/ui'
import { Controller, useForm } from 'react-hook-form'
import { rolesUsersArray } from '@shared/model/user'

export const AddDocumentForm = () => {
  const { control } = useForm()
  return (
    <CreateForm title={'Добавление пользователя'}>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Категория документа *"
            selectItems={rolesUsersArray}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Кому доступен документ *"
            selectItems={rolesUsersArray}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Input label={'Название документа *'} />
      <Controller
        name="role"
        control={control}
        render={({ field: { onChange } }) => <FileUploader onFileSelect={onChange} />}
      />
    </CreateForm>
  )
}
