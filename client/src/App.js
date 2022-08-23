import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbarcomp from "./components/Navbarcomp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/About";
import Create from "./components/Create";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbarcomp />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
