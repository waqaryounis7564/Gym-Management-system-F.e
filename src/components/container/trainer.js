import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/tableT";
import BtnR from "../common/buttonR";
import { getTrainers } from "../../service/trainerService";

class Trainer extends Component {
  state = { trainers: [] };
  async componentDidMount() {
    const { data: trainers } = await getTrainers();
    this.setState({ trainers });
  }
  render() {
    return (
      <div>
        <h1>Trainer</h1>
        <Link to="/registerTrainer">
          <BtnR name="Register new Trainer"></BtnR>
        </Link>

        <Table trainers={this.state.trainers}></Table>
      </div>
    );
  }
}

export default Trainer;
