import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/detail/:id" element={<Details />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
