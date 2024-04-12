import { ChangeEvent, forwardRef } from "react";
import styles from "./Input.module.scss";

type InputProps = {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, onChange, name }, ref) => {
    return (
      <div className={styles.container}>
        <input
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          name={name}
          className={styles.input}
        />
        <label className={styles.label}>{placeholder}</label>
      </div>
    );
  },
);
