import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

import "./exercise.css";
import { getExercises, deleteExercise } from "../../service/exerciseService";
import Extable from "../common/Extable";
import { ToastContainer, toast } from "react-toastify";

class Exercise extends Component {
  state = {
    exercises: [],
    data: {
      exerciseType: "",
      name: "",
      description: ""
    },
    errors: {}
  };
  async componentDidMount() {
    const { data: exercises } = await getExercises();
    this.setState({ exercises });
    console.log(exercises);
  }

  handleDelete = async id => {
    const originalState = this.state.exercises;
    const exercise = this.state.exercises.filter(
      exercise => exercise._id !== id
    );
    this.setState({ exercises: exercise });

    try {
      await deleteExercise(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        toast("exercise already deleted");
      this.setState({ exercises: originalState });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <Link to="/createexercise/new">
          <MDBBtn gradient="peach">Create New Exercise</MDBBtn>
        </Link>
        <div className="container">
          <Extable
            exercises={this.state.exercises}
            onDelete={this.handleDelete}
          ></Extable>
        </div>
      </React.Fragment>
    );
  }
}

export default Exercise;
