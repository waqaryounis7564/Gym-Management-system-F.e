import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "../common/table";
import BtnR from "../common/buttonR";

class Member extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Members</h1>
        <Link to="/registerUser">
          <BtnR name="Register new Member"></BtnR>
        </Link>

        <Table></Table>
      </div>
    );
  }
}

export default Member;
