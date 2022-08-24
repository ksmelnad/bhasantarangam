import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BsArrowRightShort } from "react-icons/bs";

import axios from "axios";

function Home() {
  const [words, setWords] = useState([]);
  const [padas, setPadas] = useState([]);
  const [isEng, setIsEng] = useState(true);
  const [isKan, setIsKan] = useState(false);
  const [isHin, setIsHin] = useState(false);
  const [isMar, setIsMar] = useState(false);
  const [isEx, setIsEx] = useState(false);
  const [outputPadas, setOutputPadas] = useState(padas);

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/words"
      : "https://bhasantarangam.herokuapp.com/words";
  const URL_PADAS =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/padas"
      : "https://bhasantarangam.herokuapp.com/padas";

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
    async function getPadas() {
      await axios
        .get(URL_PADAS)
        .then((res) => {
          setPadas(res.data);
          setOutputPadas(res.data);
        })
        .catch(console.error());
    }
    getPadas();
  }, [URL]);

  const engHandler = () => {
    setIsEng(true);
    setIsKan(false);
    setIsHin(false);
    setIsMar(false);
    setIsEx(false);
  };

  const kanHandler = () => {
    setIsEng(false);
    setIsKan(true);
    setIsHin(false);
    setIsMar(false);
    setIsEx(false);
  };

  const hinHandler = () => {
    setIsEng(false);
    setIsKan(false);
    setIsHin(true);
    setIsMar(false);
    setIsEx(false);
  };

  const marHandler = () => {
    setIsEng(false);
    setIsKan(false);
    setIsHin(false);
    setIsMar(true);
    setIsEx(false);
  };

  const exHandler = () => {
    setIsEng(false);
    setIsKan(false);
    setIsHin(false);
    setIsMar(false);
    setIsEx(true);
  };

  const sortAlphaHandler = () => {
    const strAscending = [...padas].sort((a, b) =>
      a.title_trans > b.title_trans ? 1 : -1
    );
    setOutputPadas(strAscending);
  };

  const sortIdHandler = () => {
    setOutputPadas(padas);
  };

  return (
    <>
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <h1 style={{ color: "#355764", fontWeight: "bold" }}>
          ऋक्पदार्थदैनन्दिनी
        </h1>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              color: "#FFF9CA",
              borderColor: "#355764",
              backgroundColor: "#355764",
              marginRight: "10px",
            }}
            size="sm"
            variant="outline-dark"
            className="float-right"
            onClick={sortAlphaHandler}
          >
            Sort by Alpha
          </Button>
          <Button
            style={{
              color: "#FFF9CA",
              borderColor: "#355764",
              backgroundColor: "#355764",
            }}
            size="sm"
            variant="outline-dark"
            className="float-right"
            onClick={sortIdHandler}
          >
            Sort by ID
          </Button>
        </div>
      </Container>
      <Container>
        {/* <Row xs={1} md={2}>
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
        </Row> */}
        <Row xs={1} md={2}>
          {outputPadas.map((data, index) => {
            return (
              <>
                <Col>
                  <Card
                    key={index}
                    className="mt-3 p-2"
                    style={{
                      backgroundColor: "#355764",
                      color: "#FFF9CA",
                      height: "98%",
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <div>{data.title}</div>
                        <div>{data.title_trans}</div>
                        <div>{data.id}</div>
                      </Card.Title>
                      <Card.Text>
                        {data["san"].map((d, index) => {
                          return (
                            <>
                              {" "}
                              <BsArrowRightShort />{" "}
                              <span key={index}>{d} </span> <br />
                            </>
                          );
                        })}

                        {isEng
                          ? data["eng"].map((d, index) => {
                              return (
                                <>
                                  {" "}
                                  <BsArrowRightShort />{" "}
                                  <span key={index}>{d} </span> <br />
                                </>
                              );
                            })
                          : null}

                        {isKan
                          ? data["kan"].map((d, index) => {
                              return (
                                <>
                                  {" "}
                                  <BsArrowRightShort />{" "}
                                  <span key={index}>{d} </span> <br />
                                </>
                              );
                            })
                          : null}

                        {isHin
                          ? data["hin"].map((d, index) => {
                              return (
                                <>
                                  {" "}
                                  <BsArrowRightShort />{" "}
                                  <span key={index}>{d} </span> <br />
                                </>
                              );
                            })
                          : null}

                        {isMar
                          ? data["mar"].map((d, index) => {
                              return (
                                <>
                                  {" "}
                                  <BsArrowRightShort />{" "}
                                  <span key={index}>{d} </span> <br />
                                </>
                              );
                            })
                          : null}

                        {isEx
                          ? data["ex"].map((d, index) => {
                              return (
                                <>
                                  {" "}
                                  <BsArrowRightShort />{" "}
                                  <span key={index}>{d} </span> <br />
                                </>
                              );
                            })
                          : null}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button
                        style={{ color: "#FFF9CA", borderColor: "#355764" }}
                        size="sm"
                        variant="outline-dark"
                        onClick={engHandler}
                      >
                        Eng
                      </Button>
                      <Button
                        style={{ color: "#FFF9CA", borderColor: "#355764" }}
                        size="sm"
                        variant="outline-dark"
                        onClick={kanHandler}
                      >
                        Kan
                      </Button>
                      <Button
                        style={{ color: "#FFF9CA", borderColor: "#355764" }}
                        size="sm"
                        variant="outline-dark"
                        onClick={hinHandler}
                      >
                        Hin
                      </Button>
                      <Button
                        style={{ color: "#FFF9CA", borderColor: "#355764" }}
                        size="sm"
                        variant="outline-dark"
                        onClick={marHandler}
                      >
                        Mar
                      </Button>
                      <Button
                        style={{ color: "#FFF9CA", borderColor: "#355764" }}
                        size="sm"
                        variant="outline-dark"
                        onClick={exHandler}
                      >
                        Ex.
                      </Button>
                    </Card.Footer>
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
