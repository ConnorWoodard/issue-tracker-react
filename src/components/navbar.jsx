import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../register.css';

const CustomNavbar = () => {
  const gradientBackground = {
    background: 'linear-gradient(to right, #800080, #ff0000)', // Purple to Red gradient
  };

  return (
    <Navbar style={gradientBackground} expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/login" className="text-white">
          Bug Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler-icon" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll>
            <Nav.Link as={Link} to="/login" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="text-white">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/bugs" className="text-white">
              Bugs
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
