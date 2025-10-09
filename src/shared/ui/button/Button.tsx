// import styled from "@emotion/styled";
// import React from "react";
// import { PrimaryButton, OutlinedButton, SecondaryButton } from "./ButtonThemes";
// import { Button as ButtonRadix, type ButtonProps } from "@radix-ui/themes";
// // import styles from "./Button.module.scss";
// import { PlusIcon } from "@radix-ui/react-icons";

// interface ButtonHeaderProps extends ButtonProps {
//   label: React.ReactNode;
// }

// export const ButtonTemplate: React.FC<ButtonHeaderProps> = ({
//   label = "",
//   className = "",
//   ...rest
// }) => {
//   return (
//     <ButtonRadix className={className} {...rest}>
//       {label}
//     </ButtonRadix>
//   );
// };

// interface ButtonWithIconTemplateProps {
//   label?: string;
//   className?: string;
// }

// export const ButtonWithIconTemplate: React.FC<ButtonWithIconTemplateProps> = ({
//   label = "",
//   className = "",
// }) => {
//   return (
//     <ButtonRadix className={className}>
//       <PlusIcon /> {label}
//     </ButtonRadix>
//   );
// };

////////////////////////////////////////////////

// components/Buttons/index.tsx
import React from 'react'
import { Button, type ButtonProps } from '@mui/material'
import { Add, Check } from '@mui/icons-material'

// Base button props
interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  disabled?: boolean
}

// Header Button
export const HeaderButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => (
  <Button
    variant="custom-primary"
    disabled={disabled}
    {...props}
    sx={{
      maxWidth: '119px',
      height: '40px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Authorization Button
export const AuthorizationButton: React.FC<CustomButtonProps> = ({
  children,
  disabled,
  ...props
}) => (
  <Button
    variant="custom-primary"
    disabled={disabled}
    {...props}
    sx={{
      width: '420px',
      height: '40px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Confirm Button
export const ConfirmButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => (
  <Button
    variant="custom-primary"
    disabled={disabled}
    {...props}
    sx={{
      width: '163px',
      height: '40px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Decline Button
export const DeclineButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => (
  <Button
    variant="custom-outlined"
    disabled={disabled}
    {...props}
    sx={{
      width: '163px',
      height: '40px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Add User Button
export const AddUserButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => (
  <Button
    variant="custom-primary"
    disabled={disabled}
    startIcon={<Add />}
    {...props}
    sx={{
      width: '220px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Add Document Button
export const AddDocumentButton: React.FC<CustomButtonProps> = ({
  children,
  disabled,
  ...props
}) => (
  <Button
    variant="custom-primary"
    disabled={disabled}
    startIcon={<Add />}
    {...props}
    sx={{
      width: '193px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Delete Document Button
export const DeleteDocumentButton: React.FC<CustomButtonProps> = ({
  children,
  disabled,
  ...props
}) => (
  <Button
    variant="custom-secondary"
    disabled={disabled}
    {...props}
    sx={{
      maxWidth: '160px',
      height: '36px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)

// Delete Document Button
export const FamiliarizationDocumentButton: React.FC<CustomButtonProps> = ({
  children,
  disabled,
  ...props
}) => (
  <Button
    variant="custom-secondary"
    disabled={disabled}
    endIcon={<Check />}
    {...props}
    sx={{
      maxWidth: '157px',
      height: '36px',
      minWidth: '60px',
      borderRadius: '12px',
      padding: '8px 16px',
      ...props.sx,
    }}
  >
    {children}
  </Button>
)
