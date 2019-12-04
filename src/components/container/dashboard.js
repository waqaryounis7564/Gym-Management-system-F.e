import React, { Component } from "react";
import { getMembers, getMember } from "../../service/memberService";
import http from "../../util/httpService";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Stat from "../common/stat";

class Dashboard extends Component {
  state = {};
  async componentDidMount() {}
  render() {
    return (
      <div className="jumbotron-fluid">
        <ToastContainer />
        <Stat></Stat>
      </div>
    );
  }
}

export default Dashboard;
