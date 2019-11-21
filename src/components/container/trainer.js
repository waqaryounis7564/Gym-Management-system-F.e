import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import BtnR from "../common/buttonR";

class Trainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Trainer</h1>
        <Link to="/registerTrainer">
          <BtnR name="Register new Trainer"></BtnR>
        </Link>

        <Table></Table>
      </div>
    );
  }
}

export default Trainer;
