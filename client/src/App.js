import Home from "./components/Home";
import Navbarcomp from "./components/Navbarcomp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/About";
import Create from "./components/Create";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useContext } from "react";
import { myContext } from "./Context";
import Nothing from "./components/Nothing";

function App() {
  const context = useContext(myContext);
  return (
    <>
      <BrowserRouter>
        <Navbarcomp />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          {context ? (
            <>
              <Route path="/create" element={<Create />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <Route path="*" element={<Nothing />} />
          )}
          <Route path="*" element={<Nothing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
