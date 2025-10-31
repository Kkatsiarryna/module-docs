import { Input, Select } from '@shared/ui'
import { CreateForm } from '@shared/ui/create-form/CreateForm.tsx'

export const DocumentsPage = () => {
  const role = ['Admin', 'HR', 'Manager']

  return (
    <>
      <CreateForm title={'Добавление пользователя'}>
        <Input label={'Имя'} required />
        <Input label={'Фамилия'} required />
        <Select placeholder={'Роль'} selectItems={role} />
        <Input label={'Email'} required />
      </CreateForm>
    </>
  )
}
