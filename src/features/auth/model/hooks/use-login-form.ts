import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginCredentials, LOGIN_SCHEMA, setIsLoggedInAC } from '@features/auth/model'
import { useLoginMutation } from '@features/auth/api'
import { useAppDispatch } from '@app/store'
import { useNavigate } from 'react-router-dom'
import { routes } from '@shared/config'
import { useToast } from '@app/providers/toast'

export const useLoginForm = () => {
  const [loginMutation, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const form = useForm<LoginCredentials>({
    mode: 'onChange',
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //Раскомментировать когда появится backend
  const { reset } = form
  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await loginMutation(data).unwrap()
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      reset()
      navigate(routes.documents, { replace: true })
    } catch {
      showToast('Такой аккаунт не существует или введены неверные данные', 'error')
    }
  }

  //удалить когда появится backend
  // const onSubmit = () => {
  //   dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  // }

  return {
    ...form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting || isLoading,
  }
}
