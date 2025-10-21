import { Button, Input, Typography } from '@shared/ui'
import styles from './LoginForm.module.scss'
import { type LoginCredentials, loginSchema } from '@features/auth/model'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // control,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginCredentials) => {
    console.log('Авторизация', data)
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="heading2" className={styles.title}>
        Авторизация
      </Typography>

      <Input
        label="Email"
        // type="email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        className={styles.inputEmail}
        {...register('email')}
      />

      <Input
        label="Пароль"
        // type="password"
        required
        error={!!errors.password}
        helperText={errors.password?.message}
        className={styles.inputPassword}
        {...register('password')}
      />

      <Button variant={'primary'} type="submit" disabled={isSubmitting} className={styles.button}>
        Войти
      </Button>
    </form>
  )
}
