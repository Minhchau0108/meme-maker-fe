import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./pages/Routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
