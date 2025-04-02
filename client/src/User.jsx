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

  const handleProfilePicChange = (picUrl) => {
    setFormData((prev) => ({
      ...prev,
      image: picUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      //alert("Current password is required to update profile.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/${user.id}`,
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
        login(data); // Update user data in AuthContext
        // alert("Profile updated successfully!");
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
              <Form.Check
                type="checkbox"
                name="military"
                label="Are you in the military?"
                checked={formData.military}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>Select Profile Picture</Form.Label>
            <Row>
              {[...Array(7)].map((_, index) => {
                const imgUrl = `http://localhost:3001/images/profile/${
                  index + 1
                }.jpg`;
                return (
                  <Col
                    key={index}
                    xs={6}
                    md={4}
                    className="profile_Pic"
                  >
                    <Image
                      className={`profile_Pic ${
                        formData.image === imgUrl
                          ? "selected"
                          : ""
                      }`}
                      src={imgUrl}
                      roundedCircle
                      onClick={() =>
                        handleProfilePicChange(imgUrl)
                      }
                      style={{
                        cursor: "pointer",
                        border:
                          formData.image === imgUrl
                            ? "3px solid blue"
                            : "none",
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
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
