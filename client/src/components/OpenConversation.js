import { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import useConversations from "../contexts/ConversationsContext";

export default function OpenConversation() {
    const [text, setText] = useState("");

    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    const { sendMessage, selectedConversation } = useConversations();

    const handleSubmit = e => {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id), text);
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto ">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((msg, ind) => {
                        const lastMessage = selectedConversation.messages.length - 1 === ind;
                        return (<div ref={lastMessage ? setRef : null} key={ind} className={`my-1 d-flex flex-column ${msg.fromMe ? 'align-self-end' : ''}`}>
                            <div className={`rounded px-2 py-1 ${msg.fromMe ? 'bg-primary text-white' : 'border'}`}>{msg.text}</div>
                            <div className={`text-muted small ${msg.fromMe ? 'text-right' : ''}`}>{msg.fromMe ? 'You' : msg.senderName}</div>
                        </div>)
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control placeholder="Type your message here..."
                            as='textarea'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ height: "75px" }}
                            required />
                        <Button className="m-2" type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
