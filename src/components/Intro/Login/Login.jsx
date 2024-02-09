import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './Login.css'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true)

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
            const response = await fetch('http://localhost:3030/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
                )
            });
      
            const data = await response.json();
      
            if (response.ok) {
              console.log(data.message)// Assuming the server returns a message
            } else {
              throw new Error(data.error); // Assuming the server returns an error message
            }
          } catch (error) {
            console.log('Error: ' + error.message);
          }
    }
    

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="card-custom">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: '#f2881d' }}>Sign In</h2>
                        <Form onSubmit={event => login(event)}>
                            <Form.Group id="email">
                                <Form.Label style={{ color: '#FF7F00' }}>Email</Form.Label>
                                <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group id="password" className="mt-1">
                                <Form.Label style={{ color: '#FF7F00' }}>Password</Form.Label>
                                <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                {!isValidPassword && <p className="error-message" style={{ color: 'red' }}>Password must be at least 8 characters long.</p>}
                                <div className="d-flex justify-content-end mt-2 mb-2">
                                    <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
                                </div>
                            </Form.Group>
                            <Button className="w-100 mb-3 login-btn" type="submit">Log In</Button>
                        </Form>
                        <div className="text-center" style={{ color: '#f2881d' }}>
                            New here? <a href="#register" className="register-link">Register</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}
