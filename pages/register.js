import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Register(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(user, password, password2);
      setWarning("");
      router.push("/");
    } catch (err) {
      console.log("err", err);
      setWarning(err.message);
    }
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4 pt-20">
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Enter your information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="username"
            name="username"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </div>
    </>
  );
}
