import React, { Component } from "react";
import "./dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    document.body.id = "newID";
  }

  render() {
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
      </React.Fragment>
    );
  }
}

export default Dashboard;
