import React from "react";
import { Button, type ButtonProps } from "@radix-ui/themes";
// import styles from "./Button.module.scss";
import { PlusIcon } from "@radix-ui/react-icons";

interface ButtonHeaderProps extends ButtonProps {
  label: React.ReactNode;
}

export const ButtonTemplate: React.FC<ButtonHeaderProps> = ({
  label = "",
  className = "",
  ...rest
}) => {
  return (
    <Button className={className} {...rest}>
      {label}
    </Button>
  );
};

interface ButtonWithIconTemplateProps {
  label?: string;
  className?: string;
}

export const ButtonWithIconTemplate: React.FC<ButtonWithIconTemplateProps> = ({
  label = "",
  className = "",
}) => {
  return (
    <Button className={className}>
      <PlusIcon /> {label}
    </Button>
  );
};

////////////////////////////////////////////////


