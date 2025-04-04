import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function App() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (createAccount) {
      // Create account
      const {
        first_name,
        last_name,
        username,
        password,
        newPassword,
      } = formData;

      if (password !== newPassword) {
        alert("Passwords do not match");
        return;
      }

      const userData = {
        first_name,
        last_name,
        username,
        password,
      };

      try {
        const response = await fetch("http://localhost:8081/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("User created:", data);
          setCreateAccount(false);
          navigate(`/login`);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    } else {

      const { username, password } = formData;

      try {
        const response = await fetch(
          "http://localhost:8081/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("User logged in:", data);
          login(data.user);
          navigate(`/user_inventory`);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Failed to login:", error);
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          {!createAccount && (
            <h3 style={{ textAlign: "center" }}>Login</h3>
          )}
          {createAccount && (
            <h3 style={{ textAlign: "center" }}>Create Account</h3>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {createAccount && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

            </>
          )}

          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: "10px" }}
          >
            {createAccount ? "Create Account" : "Login"}
          </Button>

          <Button
            variant="link"
            onClick={() => setCreateAccount(!createAccount)}
          >
            {createAccount
              ? "Already have an account? Login"
              : "Don't have an account? Create one"}
          </Button>
        </Form>
      </div>
    </>
  );
}
