import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ placeholder, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <input {...props} placeholder={placeholder} ref={ref} className={styles.input} />
        <label className={styles.label}>{placeholder}</label>
      </div>
    );
  },
);
