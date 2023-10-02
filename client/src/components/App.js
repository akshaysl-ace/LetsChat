import Login from "./Login";
import useLocalStorage from './../hooks/useLocalStorage';
import DashBoard from "./DashBoard";
import { ContactsProvider } from "../contexts/ContactsContext";
import { ConversationsProvider } from "../contexts/ConversationsContext";

function App() {
  const [id, setId] = useLocalStorage('id');


  return (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        {id ? <DashBoard id={id} /> : <Login onIdSubmit={setId} />}
      </ConversationsProvider>
    </ContactsProvider>
  );
}

export default App;
