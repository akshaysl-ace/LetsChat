import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useContacts from "./ContactsContext";

const arrayEuals = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    a.sort();
    b.sort();

    return a.every((ele, index) => {
        return ele === b[index];
    });
}

const ConversationsContext = createContext();

export function ConversationsProvider({ id, children }) {

    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();

    const createConverSation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }];
        });
    }

    const formattedConversations = conversations.map((conv, index) => {
        const recipients = conv.recipients.map(rec => {
            const contact = contacts.find(contact => contact.id === rec);
            const name = (contact && contact.name) || rec;
            return { id: rec, name: name }
        });
        const messages = conv.messages.map((msg => {
            const contact = contacts.find(contact => contact.id === msg.sender);
            const name = (contact && contact.name) || msg.sender;
            const fromMe = id === msg.sender;

            return { ...msg, senderName: name, fromMe }
        }))
        return { ...conv, recipients: recipients, messages: messages, selected: index === selectedConversationIndex }
    });

    const addMessageToConversation = (recipients, text, sender) => {
        setConversations(prev => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newConversations = prev.map(conv => {
                if (arrayEuals(conv.recipients, recipients)) {
                    madeChange = true;
                    return { ...conv, messages: [...conv.messages, newMessage] }
                }
                return conv;
            });
            if (madeChange) {
                return newConversations;
            } else {
                return [...prev, { recipients, messages: [newMessage] }]
            }
        })
    }

    const sendMessage = (recipients, text) => {
        addMessageToConversation(recipients, text, id);
    }

    const providerValue = {
        conversations: formattedConversations,
        createConverSation,
        sendMessage,
        selectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        setSelectedConversationIndex
    }

    return (
        <ConversationsContext.Provider value={providerValue}>
            {children}
        </ConversationsContext.Provider>
    )
}

export default function useConversations() {
    return useContext(ConversationsContext);
}