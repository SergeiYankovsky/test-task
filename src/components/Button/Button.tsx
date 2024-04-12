import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends PropsWithChildren {
  type?: "default" | "primary" | "secondary" | "default_mobile";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ type = "default", onClick, children, disabled }) => {
  const className = cn(styles.button, styles[`button_${type}`]);
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
