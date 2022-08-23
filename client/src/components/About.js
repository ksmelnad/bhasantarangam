import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <Container>
      <button type="submit" onClick={onSubmit}>
        Home
      </button>
    </Container>
  );
}

export default About;
