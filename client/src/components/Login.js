import React from "react";
import { Container } from "react-bootstrap";

function Login() {
  const googleLogin = () => {
    window.location.href = "https://bhasantarangam.herokuapp.com/auth/google";
  };
  return (
    <>
      <Container className="mt-5" style={{ textAlign: "center" }}>
        <button className="btn btn-link" onClick={googleLogin}>
          Login with Google
        </button>
      </Container>
    </>
  );
}

export default Login;
