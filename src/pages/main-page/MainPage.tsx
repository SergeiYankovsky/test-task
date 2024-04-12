import styles from "./MainPage.module.scss";
import { Header, Card, Modal } from "../../components";
import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { useState } from "react";
import { useAddUser, useDeleteUser, useGetUsers, useUpdateUser } from "./api";
import { Contact } from "../../types/types";

export const MainPage = () => {
  const { data } = useGetUsers();
  const { mutate: onAddUser } = useAddUser();
  const { mutate: onUpdateUser } = useUpdateUser();
  const { mutate: onDeleteUser } = useDeleteUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);

  const handleCloseModal = () => {
    setContact(null);
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleOpenModalWithData = (contact: Contact) => {
    setContact(contact);
    setIsOpenModal(true);
  };

  return (
    <main className={styles.main_page}>
      <Header />
      <section className={styles.section}>
        <Button type="desktop" onClick={handleOpenModal} />
        <Button type="mobile" onClick={handleOpenModal} />
        <div className={styles.cards_section}>
          {data?.map((contact) => {
            return (
              <Card
                key={contact.id}
                title={`${contact.firstname} ${contact.lastname}`}
                email={contact.email}
                onClick={() => handleOpenModalWithData(contact)}
              />
            );
          })}
        </div>
      </section>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <Form
          contact={contact}
          onUpdateUser={onUpdateUser}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onCloseModal={handleCloseModal}
        />
      </Modal>
    </main>
  );
};
