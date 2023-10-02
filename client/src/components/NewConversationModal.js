import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useContacts from "../contexts/ContactsContext";
import useConversations from "../contexts/ConversationsContext";

export default function NewConversationModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConverSation } = useConversations();

    const handleCheckboxChange = (id) => {
        setSelectedContactIds(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(prevId => prevId !== id);
            } else {
                return [...prevState, id];
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        createConverSation(selectedContactIds);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Start new chat</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts && contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check type="checkbox" value={selectedContactIds.includes(contact.id)} label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)} />
                        </Form.Group>
                    ))}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )

}
