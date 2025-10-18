// import React from 'react'
// import { Button as MuiButton } from '@mui/material'
// import { type ButtonProps } from './Button.types'
// import { getButtonStyles } from './Button.config'
// import { Loaders } from './Button.loaders'

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = 'primary', // По умолчанию primary кнопка
//   size = 'medium', // По умолчанию средний размер
//   loading = false, // По умолчанию не грузится
//   icon,
//   iconPosition = 'start', // По умолчанию иконка слева
//   width = 'auto', // По умолчанию - автоширина!
//   maxWidth, // Опциональная кастомная максимальная ширина
//   disabled,
//   sx,
//   ...props
// }) => {
//   // Выбираем лоадер для текущего типа кнопки
//   const loader = Loaders[variant]

//   // УМНАЯ ЛОГИКА: лоадер заменяет иконку, а не весь контент!
//   const showIconLoader = loading && icon
//   const showContentLoader = loading && !icon

//   // Если есть иконка и идет загрузка - показываем лоадер вместо иконки
//   const buttonIcon = showIconLoader ? loader : icon

//   // Если НЕТ иконки и идет загрузка - показываем лоадер вместо текста
//   const content = showContentLoader ? loader : children

//   const buttonStyles = getButtonStyles(variant, size, width, maxWidth)

//   return (
//     <MuiButton
//       // Для outlined используем встроенный вариант MUI, для остальных - contained
//       variant={variant === 'outlined' ? 'outlined' : 'contained'}
//       // disabled или loading - кнопка неактивна
//       disabled={disabled || loading}
//       // Убираем анимацию при клике
//       disableRipple
//       // Иконка слева или справа (MUI сам заботится об отступах)
//       startIcon={iconPosition === 'start' ? buttonIcon : undefined}
//       endIcon={iconPosition === 'end' ? buttonIcon : undefined}
//       // Собираем ВСЕ стили вместе
//       sx={{
//         ...buttonStyles, // Наши базовые стили
//         ...sx, // Кастомные стили извне
//       }}
//       // Все остальные пропсы передаем как есть
//       {...props}
//     >
//       {/* Текст кнопки (или лоадер если нет иконки) */}
//       {content}
//     </MuiButton>
//   )
// }
