import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { myContext } from "../Context";

function Dashboard() {
  const context = useContext(myContext);
  const username = context.username;
  const [words, setWords] = useState([]);

  // const { id } = useParams();

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/padas"
      : "https://bhasantarangam.herokuapp.com/padas";

  useEffect(() => {
    async function getWords() {
      await axios.get(URL).then((res) => {
        setWords(res.data);
      });
    }
    getWords();
  }, [URL]);

  async function deleteMarking(id) {
    const URL_DEL =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/padas/${id}`
        : `https://bhasantarangam.herokuapp.com/padas/${id}`;
    // console.log(id);
    await axios
      .delete(URL_DEL)
      .then(setWords(words.filter((el) => el._id !== id)));
  }

  return (
    <Container className="mt-5">
      <h3>स्वागतम् {username}</h3>
      <Table className="mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {words.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.id}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    to={`/words/${data._id}`}
                  >
                    {" "}
                    {data.title}
                  </Link>
                </td>
                <td>
                  <BsTrash
                    style={{ color: "green" }}
                    type="button"
                    onClick={() => {
                      deleteMarking(data._id);
                    }}
                  />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
