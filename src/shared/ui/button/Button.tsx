// import React from 'react'
// import { Button as MuiButton, CircularProgress, type ButtonProps } from '@mui/material'
// import Check from '../../assets/icons/outlined/check.svg?react'
// import Plus from '../../assets/icons/outlined/plus.svg?react'
// import Close from '../../assets/icons/outlined/close.svg?react'
// import Trash from '../../assets/icons/outlined/delete.svg?react'
// import styles from "./Button.module.scss"
// // import { isLoading } from '../../../app/App'

// // Часть ниже - данные для смены содержимого кнопки на лоадер

// // const innerText = ''
// export const isLoading = false;

// // let disabled = true;

// // if(isLoading){
// //   disabled = true
// // } else {
// //   disabled = false
// // }

// // let variant = 'little-button-for-add-category'

// // export const isLoaderVariant = [
// //   'button-for-add-user',
// //   'button-for-add-document',
// //   'button-for-familiarization',
// //   'button-for-add-category',
// // ].includes(variant)

// export const CustomLoaderSecondary = () => (
//   <CircularProgress size={16} sx={{ color: 'var(--accent-active)', padding: '0px 8px' }} />
// )
// export const CustomLoaderPrimary = () => (
//   <CircularProgress size={16} sx={{ color: 'var(--icon-static-light)', padding: '0px 8px' }} />
// )

// export const CustomLoaderPrimaryLittleButton = () => (
//   <CircularProgress size={16} sx={{ color: 'var(--icon-static-light)'}} />
// )

// export const CustomLoaderGhost = () => (
//   <CircularProgress size={16} sx={{ color: 'var(--icon-static-dark)', padding: '0px 8px' }} />
// )

// export const CustomLoaderGhostLittleButton = () => (
//   <CircularProgress size={16} sx={{ color: 'var(--icon-static-dark)' }} />
// )

// export const CustomLoaderOutlined = () => (
//   <CircularProgress
//     size={16}
//     sx={{ color: 'var(--accent-active)', padding: '0px 8px' }}
//   />
// )

// export type ButtonVariant =
//   | 'button-for-header'
//   | 'button-for-authorization-and-password'
//   | 'button-for-add-photo'
//   | 'button-for-confirm'
//   | 'button-for-reject'
//   | 'button-for-add-user'
//   | 'button-for-add-document'
//   | 'button-for-delete-document'
//   | 'button-for-familiarization'
//   | 'button-for-add-category'
//   | 'button-for-close'
//   | 'button-basket'
//   | 'little-button-for-add-category'

// interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
//   disabled?: boolean
//   variant: ButtonVariant
//   isLoading?: boolean
//   customLoader?: React.ReactNode
// }

// export const Button: React.FC<CustomButtonProps> = ({
//   children,
//   variant,
//   disabled,
//   ...props
// }) => {
//   let buttonContent;
//   if (isLoading){
//     buttonContent =
//       variant === 'button-for-add-user' || variant === 'button-for-add-document' ? (
//         <>
//           {<CustomLoaderPrimary />}
//           {children}
//         </>
//       ) : variant === 'button-for-familiarization' || variant === 'button-for-delete-document' ? (
//         <>
//           {children}
//           {<CustomLoaderSecondary />}
//         </>
//       ) : variant === 'button-for-add-category' && isLoading ? (
//         <>
//           {<CustomLoaderGhost />}
//           {children}
//         </>
//       ) : variant === 'button-for-close' || variant === 'button-basket' ? (
//         <>
//           <>{<CustomLoaderGhostLittleButton />}</>
//         </>
//       ) : variant === 'button-for-reject' ? (
//         <>
//           <>{<CustomLoaderOutlined />}</>
//         </>
//       ) : variant === 'button-for-header' ||
//         variant === 'button-for-authorization-and-password' ||
//         variant === 'button-for-add-photo' ||
//         variant === 'button-for-confirm' ? (
//         <>{<CustomLoaderPrimary />}</>
//       ) : variant === 'little-button-for-add-category' ? (
//         <>
//           <>{<CustomLoaderPrimaryLittleButton />}</>
//         </>
//       ) : (children)

//   } else {
//     buttonContent =
//       variant === 'button-for-add-user' || variant === 'button-for-add-document' ? (
//         <>
//           <Plus />
//           {children}
//         </>
//       ) : variant === 'button-for-familiarization' ? (
//         <>
//           {children}
//           <Check className={styles.check_icon} style={{ width: '20px', height: '20px' }} />
//         </>
//       ): variant === 'button-for-add-category' ? (
//         <>
//           <Plus className={styles.plus_icon} />
//           {children}
//         </>
//       ) : variant === 'button-for-close' ? (
//         <>
//           <Close className={styles.close_icon} />
//         </>
//       ) : variant === 'button-basket' ? (
//         <>
//           <Trash />
//         </>
//       ) : variant === 'little-button-for-add-category' ? (
//         <>
//           <Plus className={styles.button_add} />
//         </>
//       ) : (
//         children
//       )
//   }
    

//   return (
//     <MuiButton
//       className={variant === 'button-for-add-category' ? 'plus_icon_button' : ''}
//       variant={variant}
//       disabled={disabled}
//       disableRipple
//       sx={{
//         ...(variant === 'button-for-add-category' && {
//           '&:hover svg': {
//             fill: 'var(--accent-hover)',
//           },
//           '&:hover path': {
//             fill: 'var(--accent-hover)',
//           },
//         }),
//         ...(variant === 'button-for-close' && {
//           '&:hover svg': {
//             fill: 'var(--accent-hover)',
//           },
//           '&:hover path': {
//             fill: 'var(--accent-hover)',
//           },
//         }),
//       }}
//       {...props}
//     >
//       {buttonContent}
//     </MuiButton>
//   )
// }

// Button.tsx

import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import clsx from 'clsx'; // Утилита для склеивания классов
import styles from './Button.module.scss'; // Наши стили

// Лоадер
const ButtonLoader = () => <CircularProgress size={20} sx={{ color: 'inherit' }} />;

// Упрощенные пропсы. Мы больше не наследуемся от ButtonProps, так как стилизуем сами.
interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  // Наши собственные пропсы для стилизации
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'small' | 'medium';
  
  // Пропсы для управления состоянием и содержимым
  isLoading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isIconOnly?: boolean;
  
  // Позволяет передать любой другой класс извне
  className?: string;
  
  // Для атрибутов вроде type="submit"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export const Button: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary', // Значения по умолчанию
  size = 'medium',
  isLoading = false,
  disabled = false,
  startIcon,
  endIcon,
  isIconOnly = false,
  className,
  ...props
}) => {

  // 1. Динамически собираем классы с помощью clsx
  const buttonClasses = clsx(
    styles.button,
    styles[variant], // styles['primary']
    styles[size],     // styles['medium']
    {
      [styles.iconOnly]: isIconOnly, // Добавить класс .iconOnly, если isIconOnly=true
    },
    className // Добавляем внешние классы
  );

  // 2. Определяем, что показывать: контент или ничего (если isLoading)
  const showContent = !isLoading;

  return (
    // Вместо MuiButton можно даже использовать обычный <button>,
    // но MuiButton дает нам полезные вещи, вроде эффекта "волны" (ripple)
    <MuiButton
      className={buttonClasses}
      disabled={disabled || isLoading}
      disableRipple={variant === 'ghost'} // Отключаем ripple для прозрачных кнопок, например
      {...props}
    >
        {/* Иконка в начале */}
        {showContent && startIcon && <span>{startIcon}</span>}

        {/* Основной контент (текст или иконка) */}
        <span className={clsx({ [styles.contentHidden]: isLoading })}>
             {children}
        </span>

        {/* Иконка в конце */}
        {showContent && endIcon && <span>{endIcon}</span>}
        
        {/* Лоадер */}
        {isLoading && (
            <span className={styles.loader}>
                <ButtonLoader />
            </span>
        )}
    </MuiButton>
  );
};