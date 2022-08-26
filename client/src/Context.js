import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const myContext = createContext({});

function Context(props) {
  const [userObject, setUserObject] = useState();
  console.log("User from context:", userObject);

  useEffect(() => {
    axios
      .get("https://bhasantarangam.herokuapp.com/getuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}

export default Context;
