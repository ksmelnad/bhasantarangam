import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const myContext = createContext({});

function Context(props) {
  const [user, setUser] = useState();

  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/getuser"
      : "https://bhasantarangam.herokuapp.com/getuse";

  useEffect(() => {
    axios
      .get(URL, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      });
  }, []);
  return <myContext.Provider value={user}>{props.children}</myContext.Provider>;
}

export default Context;
