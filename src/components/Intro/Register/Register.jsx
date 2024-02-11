import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import Login from '../Login/Login';
import backendUrlPath from '../../../backendUrlPath.js';

export default function Register() {
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [email, setEmail] = useState('');
    const [name,setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordsEqual, setPasswordsEqual] = useState(true)
    const [allFieldsMessage, setAllFieldsMessage] = useState(false)
    const [login, setLogin] = useState(false)

    function register(event) {
        event.preventDefault()
        if(!email || !name || !surname || !password1 || !password2) {
            setAllFieldsMessage(true)
            return
        }

        event.preventDefault()
        if(password1.length < 8) {
            setIsValidPassword(false)
            return
        }
        setIsValidPassword(true)
        if(password1 === password2) {
            setPasswordsEqual(true)
            fetch(`${backendUrlPath}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: name,
                        surname: surname,
                        email: email,
                        password: password1
                    }
                )
            })
            .then(res => res.json())
            .then(res => {
                if(res.jwt) {
                    localStorage.setItem('jwt',res.jwt)
                    localStorage.setItem('sortBy','title')
                    window.location.reload();
                }
            })
        }
        else {
            setPasswordsEqual(false)
        }
    }

    if(login) {
        return (
          <Login />
        )
      }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="card-custom">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: '#f2881d' }}>Register</h2>
                        <Form onSubmit={event => register(event)}>
                            <Form.Group id="name">
                                <Form.Label style={{ color: '#FF7F00' }}>Name</Form.Label>
                                <Form.Control className='mb-1' type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="surname">
                                <Form.Label style={{ color: '#FF7F00' }}>Surname</Form.Label>
                                <Form.Control className='mb-1' type="text" required value={surname} onChange={(e) => setSurname(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label style={{ color: '#FF7F00' }}>Email</Form.Label>
                                <Form.Control className='mb-1' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="password1">
                                <Form.Label style={{ color: '#FF7F00' }}>password</Form.Label>
                                <Form.Control className='mb-1' type="password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="password2">
                                <Form.Label style={{ color: '#FF7F00' }}>Repeat password</Form.Label>
                                <Form.Control className='mb-3' type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </Form.Group>
                            {!passwordsEqual && <p className="error-message" style={{ color: 'red' }}>Passwords are not equal!</p>}
                            {!isValidPassword && passwordsEqual && <p className="error-message" style={{ color: 'red' }}>Password must be at least 8 characters long.</p>}
                            {allFieldsMessage && <p className="error-message" style={{ color: 'red' }}>All fields are necessary.</p>}
                            <Button className="w-100 mb-3 login-btn" type="submit">Register</Button>
                        </Form>
                        <div className="text-center" style={{ color: '#f2881d' }}>
                            Already registered? <a style={{cursor:'pointer'}} className="register-link" onClick={(event) => setLogin(true)}>Login</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}