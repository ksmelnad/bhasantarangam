import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { myContext } from "../Context";
import axios from "axios";

function Navbarcomp() {
  const context = useContext(myContext);
  // console.log("Context", context);

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/auth/logout"
      : "https://bhasantarangam.herokuapp.com/auth/logout";

  const logout = () => {
    axios
      .get(URL, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/";
        } else {
          console.log("Cannot logout!");
        }
      });
  };
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
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          {context ? (
            <>
              <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/create">
                Create
              </Nav.Link>
              <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link style={{ color: "#FFFFFF" }} onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
