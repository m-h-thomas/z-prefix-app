import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Image, Row, Col } from "react-bootstrap";

export default function User() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: user?.username || "",
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        login(data);
        navigate(`/`);
      } else {
        console.error("Error:", data.error);
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Please log in to view and edit your profile.</p>;
  }

  return (
    <>
      <Nav search={false} logouts={true} />
      <div style={{ padding: "20px" }}>
        <div className="login-container">
          <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Form.Group>{" "}

            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ padding: "10px" }}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
