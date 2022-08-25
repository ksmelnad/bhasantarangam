import React from "react";
import { Container } from "react-bootstrap";

function Login() {
  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/auth/google"
      : "https://bhasantarangam.herokuapp.com/auth/google";

  const googleLogin = () => {
    window.location.href = URL;
  };
  return (
    <>
      <Container className="mt-5">
        <button className="btn btn-link" onClick={googleLogin}>
          Login with Google
        </button>
      </Container>
    </>
  );
}

export default Login;
