import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './Login.css';
import Spinner from 'react-bootstrap/Spinner';
import consts from '../../../consts.js';
import { useNavigate } from 'react-router-dom';

export default function Login({e_mail = ''}) {
    const [email, setEmail] = useState(e_mail);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [areValidCredentials, setAreValidCredentials] = useState(true)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function handleForgottenPassword(event) {
        event.preventDefault()
        navigate('/forgotPassword')
    }

    function handleRegister(event) {
        event.preventDefault()
        navigate('/register')
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
            fetch(`${consts.getBackendUrl()}/api/users/login`, {
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
                    localStorage.setItem('sortBy','title')
                    setLoading(false)
                    navigate('/home')
                }
                else {
                    setAreValidCredentials(false)
                    setLoading(false)
                }                   
            })
            .catch(err => {
                console.error('Login error:', err);
                setLoading(false);
            })
          } catch (error) {
            console.log('Error: ' + error.message);
          }
    }

    return (
        loading ? 
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Spinner animation="border" role="status" style={{ width: "8rem", height: "8rem", color:'orange' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>:
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card-container w-100" style={{ maxWidth: "400px" }}>
                <Card className="card-custom">
                    <Card.Body>
                        <h1 style={{fontSize: '31px', textAlign:'center',color:'red', backgroundColor:'yellow'}}>Keep track of your books!</h1>
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
