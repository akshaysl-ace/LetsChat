import { useState } from 'react';
import { Button, Nav, Tab, Modal } from 'react-bootstrap';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function SideBar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const conversationsOpen = activeKey === CONVERSATIONS_KEY;


    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div style={{ width: '250px' }} className='d-flex flex-column'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}  >
                <Nav className='justify-content-center' variant='tabs'>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='border overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='p-2 border-top border small'>
                    Your Id: <span className='text-muted'>{id}</span>
                </div>
                <Button className='rounded-0' onClick={() => setIsModalOpen(true)}>
                    New {conversationsOpen ? 'Conversation' : 'Contact'}
                </Button>
                {(localStorage.getItem(id) !== "" || localStorage.getItem(id) !== null) && <Button style={{ marginTop: "5px" }}
                    onClick={() => localStorage.removeItem('whatsApp-clone-id')}>Logout</Button>}
            </Tab.Container>
            <Modal show={isModalOpen} onHide={closeModal}>
                {conversationsOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />}
            </Modal>
        </div>
    )
}
