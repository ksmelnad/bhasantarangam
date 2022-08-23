import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function Create() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [artha, setArtha] = useState("");
  const [vyutpatti, setVyutpatti] = useState("");
  const [nighantu, setNighantu] = useState("");
  const [eng, setEng] = useState("");
  let navigate = useNavigate();

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/create"
      : "https://bhasantarangam.herokuapp.com/create";

  async function onSubmit(e) {
    e.preventDefault();

    await axios
      .post(URL, {
        id: id,
        title: title,
        artha: artha,
        vyutpatti: vyutpatti,
        nighantu: nighantu,
        eng: eng,
      })
      .then(navigate("/"));
    console.log("title submitted", title);
  }

  return (
    <Container className="mt-5">
      {/* {title && <Navigate to="/about" replace={true} />} */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="text"
            placeholder="ID"
            required
          />
          <Form.Control
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            required
          />
          <Form.Control
            value={artha}
            onChange={(e) => {
              setArtha(e.target.value);
            }}
            type="text"
            placeholder="Artha"
            required
          />
          <Form.Control
            value={vyutpatti}
            onChange={(e) => {
              setVyutpatti(e.target.value);
            }}
            type="text"
            placeholder="Vyutpatti"
            required
          />
          <Form.Control
            value={nighantu}
            onChange={(e) => {
              setNighantu(e.target.value);
            }}
            type="text"
            placeholder="Nighantu"
            required
          />
          <Form.Control
            value={eng}
            onChange={(e) => {
              setEng(e.target.value);
            }}
            type="text"
            placeholder="English"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Create;
