import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Navbarcomp() {
  return (
    <Navbar className="p-1" style={{ backgroundColor: "#355764" }}>
      <Container>
        <Navbar.Brand
          className="p-0"
          style={{ color: "#FFFFFF" }}
          as={Link}
          to="/"
        >
          <img
            src={require("../assets/Logo.png")}
            width="145"
            height="60"
            alt=""
            // className="d-inline-block align-top"
          />{" "}
          {/* Bhāṣāntaraṅgam */}
        </Navbar.Brand>
        <Nav className="ml-auto">
          {/* <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/about">
            About
          </Nav.Link> */}
          <Nav.Link style={{ color: "#FFFFFF" }}>Create</Nav.Link>
          <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>

          {/* <Nav.Link style={{ color: "#FFFFFF" }} href="/help">
            Help
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
