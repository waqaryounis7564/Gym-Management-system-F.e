import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("jwt");
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;
