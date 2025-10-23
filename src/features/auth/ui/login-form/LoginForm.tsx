import { Button, Input, Typography } from '@shared/ui'
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
        type="password"
        required
        error={!!errors.password}
        helperText={errors.password?.message}
        className={styles.inputPassword}
        {...register('password')}
      />

      <Button
        variant={'primary'}
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        className={styles.button}
      >
        Войти
      </Button>
    </form>
  )
}
