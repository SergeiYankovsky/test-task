import { FC, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "default_mobile";
}

export const Button: FC<ButtonProps> = ({ variant = "default", ...props }) => {
  const combinedClassName = cn(styles.button, styles[`button_${variant}`]);
  return <button {...props} className={combinedClassName} />;
};
