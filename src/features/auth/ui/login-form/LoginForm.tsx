import { AuthForm, Button, Input } from '@shared/ui'
import styles from './LoginForm.module.scss'
import { useLoginForm } from '@features/auth/model'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isSubmitting,
  } = useLoginForm()

  return (
    <AuthForm title="Авторизация" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        type="password"
        required
        error={!!errors.password}
        helperText={errors.password?.message}
        className={styles.inputPassword}
        {...register('password')}
      />
      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        className={styles.button}
      >
        Войти
      </Button>
    </AuthForm>
  )
}
