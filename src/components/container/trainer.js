import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/tableT";
import BtnR from "../common/buttonR";
import { getTrainers, deleteTrainer } from "../../service/trainerService";

class Trainer extends Component {
  state = { trainers: [] };
  async componentDidMount() {
    const { data: trainers } = await getTrainers();
    this.setState({ trainers });
  }
  handleDelete = async id => {
    const originalState = this.state.trainers;
    const trainer = this.state.trainers.filter(trainer => trainer._id !== id);
    this.setState({ trainers: trainer });

    try {
      const { data: trainer } = await deleteTrainer(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        console.log("movie already deleted");
      this.setState({ trainers: originalState });
    }
  };
  render() {
    return (
      <div>
        <h1>Trainer</h1>
        <Link to="/registerTrainer/new">
          <BtnR name="Register new Trainer"></BtnR>
        </Link>

        <Table
          trainers={this.state.trainers}
          handleDelete={this.handleDelete}
        ></Table>
      </div>
    );
  }
}

export default Trainer;
