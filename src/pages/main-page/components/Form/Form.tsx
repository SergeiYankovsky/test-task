import { FC } from "react";
import styles from "./Form.module.scss";
import { Contact } from "../../../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Form as FormUI } from "../../../../components";

type FormProps = {
  contact: Partial<Contact> | null;
  onAddUser: (contact: Contact) => void;
  onUpdateUser: (contact: Contact) => void;
  onDeleteUser: (id: number) => void;
  onCloseModal: () => void;
};

export const Form: FC<FormProps> = ({
  contact,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
  onCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Contact>({
    defaultValues: { ...contact },
  });
  const onSubmit: SubmitHandler<Contact> = (contact) => {
    if (!contact.id) {
      onAddUser(contact);
      onCloseModal();
      return;
    }
    onUpdateUser(contact);
    onCloseModal();
  };

  const handleDelete = () => {
    if (!contact?.id) return;
    onDeleteUser(contact.id);
    onCloseModal();
  };
  return (
    <FormUI onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <div className={styles.data_container}>
        <h2 className={styles.title}>Eintrag bearbeiten</h2>
        <div className={styles.input_container}>
          <Input
            data-testid="VornameInput"
            placeholder="Vorname*"
            {...register("firstname", { required: true })}
          />
          <Input
            data-testid="NachnameInput"
            placeholder="Nachname*"
            {...register("lastname", { required: true })}
          />
          <Input
            data-testid="E-MailInput"
            placeholder="E-Mail*"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
        </div>
      </div>
      <div className={styles.button_container}>
        {contact?.id && (
          <Button type="secondary" onClick={handleDelete}>
            LÖSCHEN
          </Button>
        )}
        <div className={styles.right_section_buttons}>
          <Button type="primary" onClick={onCloseModal}>
            ABBRECHEN
          </Button>
          <Button type="default" disabled={!isValid}>
            SPEICHERN
          </Button>
        </div>
      </div>
    </FormUI>
  );
};
