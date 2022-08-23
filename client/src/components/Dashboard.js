import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { BsTrash } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function Dashboard() {
  const [words, setWords] = useState([]);

  // const { id } = useParams();

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/words"
      : "https://bhasantarangam.herokuapp.com/words";

  useEffect(() => {
    async function getWords() {
      await axios.get(URL).then((res) => {
        setWords(res.data);
      });
    }
    getWords();
  });

  async function deleteMarking(id) {
    const URL_DEL =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/words/${id}`
        : `https://bhasantarangam.herokuapp.com/words/${id}`;
    // console.log(id);
    await axios
      .delete(URL_DEL)
      .then(setWords(words.filter((el) => el._id !== id)));
  }

  return (
    <Container className="mt-5">
      <Table>
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