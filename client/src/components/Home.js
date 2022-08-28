import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BsArrowRightShort } from "react-icons/bs";
import { FaDharmachakra, FaSortAlphaDown, FaSortNumericDownAlt } from "react-icons/fa"
import "./Card.css";

import axios from "axios";

function Home() {
  const [padas, setPadas] = useState([]);
  const [isEng, setIsEng] = useState(true);
  const [isKan, setIsKan] = useState(false);
  const [isHin, setIsHin] = useState(false);
  const [isMar, setIsMar] = useState(false);
  const [outputPadas, setOutputPadas] = useState(padas);

  const URL_PADAS =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/padas"
      : "https://bhasantarangam.herokuapp.com/padas";

  useEffect(() => {
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
  }, [URL_PADAS]);

  const engHandler = () => {
    setIsEng(true);
    setIsKan(false);
    setIsHin(false);
    setIsMar(false);
  };

  const kanHandler = () => {
    setIsEng(false);
    setIsKan(true);
    setIsHin(false);
    setIsMar(false);
  };

  const hinHandler = () => {
    setIsEng(false);
    setIsKan(false);
    setIsHin(true);
    setIsMar(false);
  };

  const marHandler = () => {
    setIsEng(false);
    setIsKan(false);
    setIsHin(false);
    setIsMar(true);
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
      <Container className="mt-5" style={{ textAlign: "center" }}>
        {/* <Card>
          <Card.Body> */}
        <h1 style={{ color: "#112f3a", fontWeight: "bold" }}>
          ऋक्पदार्थदैनन्दिनी
        </h1>
        {/* </Card.Body>
        </Card> */}
        <Row className="mt-5" >
          <Col style={{ textAlign: "left" }}>
            <Button
              style={{ color: "#FFF9CA", borderColor: "#355764", marginRight: "5px", }}
              size="sm"
              variant="outline-dark"
              onClick={engHandler}
              
            >
              Eng
            </Button>
            <Button
              style={{ color: "#FFF9CA", borderColor: "#355764", marginRight: "5px" }}
              size="sm"
              variant="outline-dark"
              onClick={kanHandler}
            >
              Kan
            </Button>
            <Button
              style={{ color: "#FFF9CA", borderColor: "#355764", marginRight: "5px" }}
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
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button
              style={{
                color: "#FFF9CA",
                borderColor: "#082129",
                backgroundColor: "#355764",
                marginRight: "5px",
              }}
              size="sm"
              variant="outline-dark"
              
              onClick={sortAlphaHandler}
            >
              <FaSortAlphaDown />
            </Button>
            <Button
              style={{
                color: "#FFF9CA",
                borderColor: "#355764",
                backgroundColor: "#355764",
              }}
              size="sm"
              variant="outline-dark"
              
              onClick={sortIdHandler}
            >
              <FaSortNumericDownAlt />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row xs={1} sm={2} md={3}>
          {outputPadas.map((data) => {
            return (
              <>
                <Col>
                  <Card
                    key={data.id}
                    className="mt-3"
                    style={{
                      color: "#FFF9CA",
                      height: "98%",
                    }}
                  >
                    <Card.Header className="d-flex justify-content-between h5">
                      {" "}
                      <div>{data.title}</div>
                      <div>{data.title_trans}</div>
                      <div>{data.id}</div>
                    </Card.Header>

                    <Card.Body>
                      <FaDharmachakra style={{marginRight: "5px"}} />
                      {data["san"].map((d, index) => {
                        return (
                          <>
                            {" "}
                            <span key={index}>{d} </span> <br/><br/>
                          </>
                        );
                      })}
                      <hr />
                      {data["ex"].map((d, index) => {
                        return (
                          <>
                            {" "}
                            <span key={index}>{d} </span> <br />
                          </>
                        );
                      })}
                      <hr />
                      {isEng
                        ? data["eng"].map((d, index) => {
                            return (
                              <>
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
