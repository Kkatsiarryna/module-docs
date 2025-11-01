import { CreateForm, Input, Select } from '@shared/ui'

const role = ['Admin', 'HR', 'Manager']

export const AddUserForm = () => {
  return (
    <CreateForm title={'Добавление пользователя'}>
      <Input label={'Имя'} required />
      <Input label={'Фамилия'} required />
      <Select placeholder={'Роль *'} selectItems={role} />
      <Input label={'Email'} required />
    </CreateForm>
  )
}
