import { FC, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

export type ModalProps = { isOpen: boolean; children: React.ReactNode; onClose: () => void };
const rootElement = document.getElementById("modal") || document.body;

export const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const handleClose = (event: MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scrollY";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div data-testid={"modal"} onClick={handleClose} className={styles.modal}>
      {children}
    </div>,
    rootElement,
  );
};
