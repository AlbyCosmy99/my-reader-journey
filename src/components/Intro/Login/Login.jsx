import React, { useState } from "react";
import { Card, Form, Button, Container, Spinner } from "react-bootstrap";
import "./Login.css"; // 👈 include .styled-btn and link styles here
import consts from "../../../consts.js";
import { useNavigate } from "react-router-dom";

export default function Login({ e_mail = "" }) {
  const [email, setEmail] = useState(e_mail);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [areValidCredentials, setAreValidCredentials] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleForgottenPassword(e) {
    e.preventDefault();
    navigate("/forgotPassword");
  }

  function handleRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  async function login(event) {
    event.preventDefault();
    if (!email || !password) return;

    if (password.length < 8) {
      setIsValidPassword(false);
      return;
    }

    setIsValidPassword(true);
    setLoading(true);

    try {
      const res = await fetch(`${consts.getBackendUrl()}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.jwt) {
        setAreValidCredentials(true);
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("sortBy", "title");
        navigate("/home");
      } else {
        setAreValidCredentials(false);
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100dvh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ width: "6rem", height: "6rem", color: "#f2cd3a" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="card-custom">
          <Card.Body>
            <h2
              className="text-center mb-4"
              style={{ color: "#f2881d", fontSize: "24px" }}
            >
              Log in to MyReaderJourney
            </h2>
            <Form onSubmit={login}>
              <Form.Group>
                <Form.Label style={{ color: "#FF7F00" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: "#FF7F00" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isValidPassword && (
                  <p className="error-message text-danger mt-1">
                    Password must be at least 8 characters long.
                  </p>
                )}
                {!areValidCredentials && isValidPassword && (
                  <p className="error-message text-danger mt-1">
                    Invalid credentials.
                  </p>
                )}
                <div className="d-flex justify-content-end mt-2 mb-3">
                  <a
                    href="forgot-password"
                    className="styled-link"
                    onClick={handleForgottenPassword}
                  >
                    Forgot Password?
                  </a>
                </div>
              </Form.Group>
              <Button type="submit" className="w-100 mb-3 styled-btn">
                Log In
              </Button>
            </Form>
            <div className="text-center" style={{ color: "#f2881d" }}>
              New here?{" "}
              <a
                href="register"
                className="styled-link"
                onClick={handleRegister}
              >
                Register
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
