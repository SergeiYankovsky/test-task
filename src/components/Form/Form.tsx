import { FC, PropsWithChildren } from "react";
import styles from "./Form.module.scss";

export interface FormProps extends PropsWithChildren {
  onSubmit: () => void;
}
export const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
