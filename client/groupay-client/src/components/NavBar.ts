import React from 'react';
import { Button, Navbar, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../img/token_4.png";

export function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="GrouPay logo"
            src={logo}
            width="100"
            height="40"
            className="d-inline-block align-center"
          />
        </Navbar.Brand>
        <Button className="m-3" onClick={handleLogOut}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}
