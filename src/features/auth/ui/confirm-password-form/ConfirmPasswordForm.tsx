import styles from './ConfirmPasswordForm.module.scss'
import { AuthForm, Button, Input, Typography } from '@shared/ui'
import { useConfirmPasswordForm } from '@features/auth/model'
import CircleIcon from '@icons/filled/circle.svg?react'
import CheckCircleGreenIcon from '@icons/filled/check_circle_green.svg?react'

type Props = {
  onSuccess: () => void
}

export const ConfirmPasswordForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    setIsFocused,
    showHint,
    hasValidLength,
    hasLettersAndDigits,
    isStrongPassword,
    isSubmitting,
  } = useConfirmPasswordForm(onSuccess)

  return (
    <AuthForm
      title="Подтверждение пароля"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Input
        label="Пароль"
        type="password"
        required
        error={!!errors.password}
        helperText={errors.password?.message}
        className={styles.inputPassword}
        {...register('password')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showHint && (
        <div className={styles.hintContainer}>
          {!isStrongPassword && (
            <div className={styles.hint}>
              <Typography variant="bodyS">Ваш пароль должен содержать:</Typography>
              <div className={styles.hintList}>
                <div className={styles.hintItem}>
                  {hasValidLength ? (
                    <CheckCircleGreenIcon className={styles.greenIcon} />
                  ) : (
                    <CircleIcon />
                  )}
                  <Typography variant="bodyS">От 6 до 30 символов</Typography>
                </div>
                <div className={styles.hintItem}>
                  {hasLettersAndDigits ? (
                    <CheckCircleGreenIcon className={styles.greenIcon} />
                  ) : (
                    <CircleIcon />
                  )}
                  <Typography variant="bodyS">Цифры, латинские буквы и спецсимволы</Typography>
                </div>
              </div>
            </div>
          )}

          {isStrongPassword && (
            <div className={styles.hint}>
              <div className={styles.hintItem}>
                <CheckCircleGreenIcon className={styles.greenIcon} />
                <Typography variant="bodyS">Пароль надёжный</Typography>
              </div>
            </div>
          )}
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={!isStrongPassword}
        loading={isSubmitting}
        className={styles.button}
      >
        Зарегистрироваться
      </Button>
    </AuthForm>
  )
}
