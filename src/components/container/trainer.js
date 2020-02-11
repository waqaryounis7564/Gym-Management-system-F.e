import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/tableT";
import BtnR from "../common/buttonR";
import { getTrainers, deleteTrainer } from "../../service/trainerService";
import Search from "../common/search";

class Trainer extends Component {
  state = { trainers: [] };

  async componentDidMount() {
    document.body.id = "trainer";
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

  handleSearchChange = e => {
    console.log(e.target.value);
    let currentList = [];

    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.trainers;

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();

        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      window.location.reload(false);
      //this.forceUpdate();
      newList = this.state.trainers;
    }

    this.setState({ trainers: newList });
  };
  render() {
    return (
      <div>
        <h1>Trainer</h1>
        <Search search={this.handleSearchChange}></Search>
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
