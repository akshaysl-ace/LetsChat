import { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

function Login({ onIdSubmit }) {
  const idRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }

  const createNewId = () => {
    onIdSubmit(uuid());
  }

  return (
    <Container className='align-items-center d-flex' style={{ height: '100vh' }}>
      <Form className='w-100' onSubmit={handleSubmit}>
        <Form.Group className='mb-4'>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button type='submit'>Login</Button>
        <Button onClick={createNewId} variant='secondary' style={{ marginLeft: '8px' }}>Create new Id</Button>
      </Form>
    </Container>
  )
}

export default Login;