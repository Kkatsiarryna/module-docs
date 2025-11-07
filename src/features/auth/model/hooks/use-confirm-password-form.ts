import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CONFIRM_PASSWORD_SCHEMA } from '@features/auth/model'
import { useConfirmPasswordMutation } from '@features/auth/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { routes } from '@shared/config'
import { useState } from 'react'
import type { ConfirmPasswordType } from '@features/auth/model/schemas/confirm-password.schema.ts'

export const useConfirmPasswordForm = () => {
  const [confirmPasswordMutation, { isLoading }] = useConfirmPasswordMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isFocused, setIsFocused] = useState(false)

  const token = searchParams.get('token')

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(CONFIRM_PASSWORD_SCHEMA),
    defaultValues: {
      password: '',
    },
  })

  const { watch } = form
  const password = watch('password')

  const hasValidLength = password.length >= 6 && password.length <= 30
  const hasLettersAndDigits =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/.test(password)
  const isStrongPassword = hasValidLength && hasLettersAndDigits
  const showHint = isFocused || password.length > 0

  const onSubmit = async ({ password }: ConfirmPasswordType) => {
    if (!token) {
      console.error('Token not found in URL')
      return
    }

    try {
      await confirmPasswordMutation({ new_password: password, token: token }).unwrap()
      navigate(routes.documents, { replace: true })
    } catch (error) {
      console.log('Ошибка подтверждения пароля:', error)
    }
  }

  return {
    setIsFocused,
    hasValidLength,
    hasLettersAndDigits,
    isStrongPassword,
    showHint,
    onSubmit,
    isSubmitting: form.formState.isSubmitting || isLoading,
    ...form,
  }
}
