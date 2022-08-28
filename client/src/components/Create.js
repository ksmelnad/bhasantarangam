import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function Create() {
  const [id, setId] = useState("");
  const [idEng, setIdEng] = useState("");
  const [title, setTitle] = useState("");
  const [title_trans, setTitleTrans] = useState("");
  const [sanOne, setSanOne] = useState("");
  const [sanTwo, setSanTwo] = useState("");
  const [sanThree, setSanThree] = useState("");
  const [engOne, setEngOne] = useState("");
  const [kanOne, setKanOne] = useState("");
  const [hinOne, setHinOne] = useState("");
  const [marOne, setMarOne] = useState("");
  const [exOne, setExOne] = useState("");
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
        id_eng: idEng,
        title: title,
        title_trans: title_trans,
        san: [sanOne, sanTwo, sanThree],
        eng: engOne.split("\n"),
        kan: kanOne.split("\n"),
        hin: hinOne.split("\n"),
        mar: marOne.split("\n"),
        ex: exOne.split("\n"),
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
            placeholder="सङ्ख्या"
            required
          />
          <Form.Control
            value={idEng}
            onChange={(e) => {
              setIdEng(e.target.value);
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
            placeholder="शीर्षकम्"
            required
          />
          <Form.Control
            value={title_trans}
            onChange={(e) => {
              setTitleTrans(e.target.value);
            }}
            type="text"
            placeholder="IAST"
            required
          />
          <Form.Control 
          as="textarea" rows={3}
            
            placeholder="व्युत्पत्तिः"
            onChange={(e) => {
              setSanOne(e.target.value);
            }}
            required
          />
          <Form.Control
            as="textarea" rows={3}
            placeholder="निष्पत्तिः"
            onChange={(e) => {
              setSanTwo(e.target.value);
            }}
            required
          />
          <Form.Control
            as="textarea" rows={3}
            placeholder="शब्दान्तराणि"
            onChange={(e) => {
              setSanThree(e.target.value);
            }}
            required
          />
          <Form.Control
            as="textarea" rows={3}
            placeholder="निगमः"
            onChange={(e) => {
              setExOne(e.target.value);
            }}
            required
          />
          <Form.Control
            as="textarea" rows={3}
            placeholder="English"
            onChange={(e) => {
              setEngOne(e.target.value);
            }}
          />
          {/* <Form.Control
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
          /> */}
          <Form.Control
            as="textarea" rows={3}
            placeholder="ಕನ್ನಡ"
            onChange={(e) => {
              setKanOne(e.target.value);
            }}
            required
          />
          {/* <Form.Control
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
          /> */}
          <Form.Control
            as="textarea" rows={3}
            placeholder="हिन्दी"
            onChange={(e) => {
              setHinOne(e.target.value);
            }}
            required
          />
          {/* <Form.Control
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
          /> */}
          <Form.Control
            as="textarea" rows={3}
            placeholder="मराठी"
            onChange={(e) => {
              setMarOne(e.target.value);
            }}
            required
          />
          {/* <Form.Control
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
          /> */}
          
          {/* <Form.Control
            type="text"
            placeholder="Ex_2"
            onChange={(e) => {
              setExTwo(e.target.value);
            }}
            required
          /> */}
        </Form.Group>
        <Button variant="success" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Create;
