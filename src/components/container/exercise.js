import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import ExerciseCard from "../common/exerciseCard";
import "./exercise.css";

class Exercise extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Link to="/createexercise">
          <MDBBtn gradient="peach">Create New Exercise</MDBBtn>
        </Link>

        <div className="container">
          <ExerciseCard></ExerciseCard>
          <ExerciseCard></ExerciseCard>
          <ExerciseCard></ExerciseCard>
        </div>
      </React.Fragment>
    );
  }
}

export default Exercise;
