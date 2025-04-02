import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Person, BoxArrowRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Import useAuth

export default function NavBar({ search, logouts }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user from AuthContext


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="nav-container">
        <div className="perm-nav">
          <div className="home-review-btns">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
        </div>
        <div className="search-area">
          {search ? (
            <>
              <div className="search-bar">
                <InputGroup className="mb-0">
                  <InputGroup.Text
                    id="basic-addon1"
                    onClick={searchBar}
                    style={{ cursor: "pointer" }}
                  >
                  </InputGroup.Text>

                  <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={input}
                    onChange={enterSearch}
                    onKeyDown={enterKeySearch}
                  />
                </InputGroup>
              </div>
            </>
          ) : (
            <span></span>
          )}
          <div className="login-area">
            {user ? (
              <>
                <p>Welcome {user.first_name} {user.last_name}!</p>
                <Link to="/" onClick={handleLogout}>
                  <BoxArrowRight style={{ width: "25px", height: "25px", marginLeft: "10px", cursor: "pointer" }} />
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Person style={{ width: "25px", height: "25px" }} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
