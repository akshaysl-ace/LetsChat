import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {

    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id, name) => {
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }];
        });
    }

    return (
        <ContactsContext.Provider value={{
            contacts: contacts, createContact
        }}>
            {children}
        </ContactsContext.Provider>
    )
}

export default function useContacts() {
    return useContext(ContactsContext);
}