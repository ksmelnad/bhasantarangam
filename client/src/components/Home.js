import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsArrowRightShort } from "react-icons/bs";

import axios from "axios";

function Home() {
  const [words, setWords] = useState([]);

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/words"
      : "https://bhasantarangam.herokuapp.com/words";

  useEffect(() => {
    async function getWords() {
      await axios
        .get(URL)
        .then((res) => {
          setWords(res.data);
        })
        .catch(console.error());
    }
    getWords();
  }, [URL]);

  return (
    <>
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <h1 style={{ color: "#355764", fontWeight: "bold" }}>
          ऋक्पदार्थदैनन्दिनी
        </h1>
      </Container>
      <Container>
        <Row xs={1} md={2}>
          {words.map((data, index) => {
            return (
              <>
                <Col>
                  <Card
                    key={index}
                    className="mt-3"
                    style={{ backgroundColor: "#355764", color: "#FFF9CA" }}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <div>{data.title}</div>
                        <div>{data.id}</div>
                      </Card.Title>
                      <Card.Text>
                        {" "}
                        <BsArrowRightShort /> {data.artha}{" "}
                      </Card.Text>

                      <Card.Text>
                        {" "}
                        <BsArrowRightShort /> {data.vyutpatti}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <BsArrowRightShort /> {data.nighantu}{" "}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <BsArrowRightShort /> {data.eng}{" "}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Home;
