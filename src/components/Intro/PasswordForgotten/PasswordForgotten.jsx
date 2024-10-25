import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import Login from '../Login/Login';
import consts from '../../../consts';
import { useNavigate } from 'react-router-dom';

export default function PasswordForgotten() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [code, setCode] = useState('')
  const [insertedCode, setInsertedCode] = useState('')
  const [incorrectCode, setIncorrectCode] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordsEqual, setPasswordsEqual] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const navigate = useNavigate()

  function sendEmail(event) {
    event.preventDefault()
    setEmailSent(true);
    fetch(`${consts.getBackendUrl()}/api/users/mails/send-verification`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
              email: email,
          }
        )
    })
    .then(res => res.json())
    .then(res => {
      if(res.code) {
        setCode(res.code)
      }
      else {
        setEmailSent(false)
        setEmail('')
      }
    })
  }

  function handleResendMail(event) {
    event.preventDefault()
    setEmailSent(false)
    setIncorrectCode(false)
    setIsChangePassword(false)
    setCode('')
    setIncorrectCode('')
    setPassword1('')
    setPassword2('')
  }

  function startChangePassword(event) {
    event.preventDefault()
    if(code !== 0 && insertedCode !== 0 && code === insertedCode) {
      setIsChangePassword(true)
    }
    else {
      setIsChangePassword(false)
      setIncorrectCode(true)
    }
  }

  function changePassword(event) {
    event.preventDefault()
    if(password1 === password2) {
      setPasswordsEqual(true)
      if(password1.length < 8) {
        setIsValidPassword(false)
        return
      }
      else {
          setIsValidPassword(true)
          fetch(`${consts.getBackendUrl()}/api/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password1
                    }
                )
            })
            .then(res => res.json())
            .then(res => {
              navigate('/login')
            })
      }

    }
    else {
      setPasswordsEqual(false)
    }
  }
 
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="card-custom">
                <Card.Body>
                  {isChangePassword ? 
                  <>
                    <Form.Group id="password1">
                      <Form.Label style={{ color: '#FF7F00' }}>password</Form.Label>
                      <Form.Control className='mb-3' type="password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    </Form.Group>
                    <Form.Group id="password2">
                      <Form.Label style={{ color: '#FF7F00' }}>Repeat password</Form.Label>
                      <Form.Control className='mb-3' type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </Form.Group>
                    <Button className="w-100 mb-3 login-btn" onClick={(event) => changePassword(event)}>Change password</Button>
                    {!passwordsEqual && <p className="error-message" style={{ color: 'red' }}>Passwords are not equal!</p>}
                    {!isValidPassword && passwordsEqual && <p className="error-message" style={{ color: 'red' }}>Password must be at least 8 characters long.</p>}
                    <Button className="w-100 mb-1 mt-3 login-btn" onClick={(event) => handleResendMail(event)}>Enter another mail</Button>
                  </> : 
                  (emailSent ? <>
                            <Form.Group id="code">
                              <Form.Label style={{ color: '#FF7F00' }}>Code</Form.Label>
                              <Form.Control className='mb-3' type="text" required value={insertedCode} onChange={(e) => setInsertedCode(e.target.value)} />
                            </Form.Group>
                            <p className="error-message" style={{ color: 'blue' }}>Check mail for verification code.</p>
                            <Button className="w-100 mb-3 login-btn" onClick={(event) => startChangePassword(event)}>Change password</Button>
                            {incorrectCode && <p className="error-message" style={{ color: 'red' }}>Incorrect code.</p>}
                            <Button className="w-100 mb-1 mt-3 login-btn" onClick={(event) => handleResendMail(event)}>Change mail</Button>
                          </> : 
                          <>
                          <h2 className="text-center mb-4" style={{ color: '#f2881d', fontSize:'25px' }}>Enter email to reset password</h2>
                          <Form onSubmit={event => sendEmail(event)}>
                              <Form.Group id="email">
                                  <Form.Label style={{ color: '#FF7F00' }}>Email</Form.Label>
                                  <Form.Control className='mb-3' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                              </Form.Group>
                              <Button className="w-100 mb-3 login-btn" type="submit">Send email</Button>
                              <Button className="w-100 mb-3 login-btn" onClick={() => navigate('/login')}>Login in</Button>
                          </Form>
                          </>)}            
                </Card.Body>
            </Card>
        </div>
    </Container>
  )
}