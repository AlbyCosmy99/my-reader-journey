import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './Login.css';
import PasswordForgotten from '../PasswordForgotten/PasswordForgotten'
import Register from '../Register/Register';
import backendUrlPath from '../../../backendUrlPath.js';
import Spinner from 'react-bootstrap/Spinner';

export default function Login({e_mail = ''}) {
    const [email, setEmail] = useState(e_mail);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [areValidCredentials, setAreValidCredentials] = useState(true)
    const [passwordForgotten, setPasswordForgotten] = useState(false)
    const [register,setRegister] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleForgottenPassword(event) {
        event.preventDefault()
        setPasswordForgotten(true)
    }

    function handleRegister(event) {
        event.preventDefault()
        setRegister(true)
    }

    async function login(event) {
        if(!email || !password) {
            return
        }
        event.preventDefault()
        
        if(password.length < 8) {
            setIsValidPassword(false)
            return
        }
        else {
            setIsValidPassword(true)
        }

        try {
            setLoading(true)
            fetch(`${backendUrlPath}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password
                    }
                )
            })
            .then(res => res.json())
            .then(res => {
                if(res.jwt) {
                    setAreValidCredentials(true)
                    localStorage.setItem('jwt',res.jwt)
                    window.location.reload();
                }
                else {
                    setAreValidCredentials(false)
                }
                setLoading(false)         
            })
          } catch (error) {
            console.log('Error: ' + error.message);
          }
    }

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <Spinner animation="border" role="status" style={{ width: "8rem", height: "8rem", color:'orange' }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if(passwordForgotten) {
        return (
            <PasswordForgotten />
        )
    }

    if(register) {
        return (
            <Register />
        )
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card-container w-100" style={{ maxWidth: "400px" }}>
                <Card className="card-custom">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: '#f2881d' }}>Login In</h2>
                        <Form onSubmit={event => login(event)}>
                            <Form.Group id="email">
                                <Form.Label style={{ color: '#FF7F00' }}>Email</Form.Label>
                                <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="password" className="mt-1">
                                <Form.Label style={{ color: '#FF7F00' }}>Password</Form.Label>
                                <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                {!isValidPassword && <p className="error-message" style={{ color: 'red' }}>Password must be at least 8 characters long.</p>}
                                {!areValidCredentials && isValidPassword && <p className="error-message" style={{ color: 'red' }}>Invalid credentials.</p>}
                                <div className="d-flex justify-content-end mt-2 mb-2">
                                    <a href="forgot-password" className="forgot-password" onClick={(event) => handleForgottenPassword(event)}>Forgot Password?</a>
                                </div>
                            </Form.Group>
                            <Button className="w-100 mb-3 login-btn" type="submit">Log In</Button>
                        </Form>
                        <div className="text-center" style={{ color: '#f2881d' }}>
                            New here? <a href="register" className="register-link" onClick={(event) => handleRegister(event)}>Register</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}
