import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function Create() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [title_trans, setTitleTrans] = useState("");
  const [sanOne, setSanOne] = useState("");
  const [sanTwo, setSanTwo] = useState("");
  const [sanThree, setSanThree] = useState("");
  const [engOne, setEngOne] = useState("");
  const [engTwo, setEngTwo] = useState("");
  const [engThree, setEngThree] = useState("");
  const [kanOne, setKanOne] = useState("");
  const [kanTwo, setKanTwo] = useState("");
  const [kanThree, setKanThree] = useState("");
  const [hinOne, setHinOne] = useState("");
  const [hinTwo, setHinTwo] = useState("");
  const [hinThree, setHinThree] = useState("");
  const [marOne, setMarOne] = useState("");
  const [marTwo, setMarTwo] = useState("");
  const [marThree, setMarThree] = useState("");
  const [exOne, setExOne] = useState("");
  const [exTwo, setExTwo] = useState("");
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
        title_trans: title_trans,
        san: [sanOne, sanTwo, sanThree],
        eng: [engOne, engTwo, engThree],
        kan: [kanOne, kanTwo, kanThree],
        hin: [hinOne, hinTwo, hinThree],
        mar: [marOne, marTwo, marThree],
        ex: [exOne, exTwo],
      })
      .then(navigate("/"));
  }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   const sanfull = [sanOne, sanTwo, sanThree];
  //   const engfull = [engOne, engTwo, engThree];
  //   console.log("San Eng", sanfull, engfull);
  // }

  return (
    <Container className="mt-5">
      <Form onSubmit={onSubmit}>
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
            value={title_trans}
            onChange={(e) => {
              setTitleTrans(e.target.value);
            }}
            type="text"
            placeholder="title_trans"
            required
          />
          <Form.Control
            type="text"
            placeholder="San_1"
            onChange={(e) => {
              setSanOne(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="San_2"
            onChange={(e) => {
              setSanTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="San_3"
            onChange={(e) => {
              setSanThree(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Eng_1"
            onChange={(e) => {
              setEngOne(e.target.value);
            }}
          />
          <Form.Control
            type="text"
            placeholder="Eng_2"
            onChange={(e) => {
              setEngTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Eng_3"
            onChange={(e) => {
              setEngThree(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Kan_1"
            onChange={(e) => {
              setKanOne(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Kan_2"
            onChange={(e) => {
              setKanTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Kan_3"
            onChange={(e) => {
              setKanThree(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Hin_1"
            onChange={(e) => {
              setHinOne(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Hin_2"
            onChange={(e) => {
              setHinTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Hin_3"
            onChange={(e) => {
              setHinThree(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Mar_1"
            onChange={(e) => {
              setMarOne(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Mar_2"
            onChange={(e) => {
              setMarTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Mar_3"
            onChange={(e) => {
              setMarThree(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Ex_1"
            onChange={(e) => {
              setExOne(e.target.value);
            }}
            required
          />
          <Form.Control
            type="text"
            placeholder="Ex_2"
            onChange={(e) => {
              setExTwo(e.target.value);
            }}
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
