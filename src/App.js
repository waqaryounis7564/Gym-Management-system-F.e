import React, { Component } from "react";
import Routes from "./util/routes";
import "./App.css";

import Dashboard from "./components/container/dashboard";
import NavBar from "./components/common/navbar";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <NavBar></NavBar>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
