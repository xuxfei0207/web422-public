import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authenticateUser(user, password);
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
            <h2>Login</h2>
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

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}

          <br />
          <Button variant="primary" className="pull-right" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
