import React, { Component } from "react";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import {
  getExercise,
  getExercises,
  saveExercise
} from "../../service/exerciseService";
import { ToastContainer, toast } from "react-toastify";

class CreateExercise extends Component {
  state = {
    exercises: [],
    data: {
      exerciseType: "",
      name: "",
      description: ""
    },
    errors: {}
  };
  handleChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  async componentDidMount() {
    const { data: exercises } = await getExercises();
    this.setState({ exercises });
    console.log(exercises);

    const exerciseId = this.props.match.params.id;
    if (exerciseId === "new") return;
    const { data: exercise } = await getExercise(exerciseId);
    this.setState({ data: this.mapToViewModel(exercise) });
    console.log(exercise);
  }
  mapToViewModel = exercise => {
    return {
      _id: exercise._id,
      exerciseType: exercise.exerciseType,
      name: exercise.name,
      description: exercise.description
    };
  };
  handleSubmit = async e => {
    e.preventDefault();

    try {
      await saveExercise(this.state.data);
      this.props.history.push("/exercise");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.info("empty field is not allowed");
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h4 text-center mb-4">Create Exercise</p>
                <label htmlFor="defaultFormContactNameEx" className="grey-text">
                  Exercise Type
                </label>
                <input
                  type="text"
                  id="defaultFormContactNameEx"
                  className="form-control"
                  name="exerciseType"
                  value={this.state.data.exerciseType}
                  onChange={this.handleChange}
                  autoFocus
                />
                <br />
                <label
                  htmlFor="defaultFormContactEmailEx"
                  className="grey-text"
                >
                  Exercise Name
                </label>
                <input
                  type="text"
                  id="defaultFormContactEmailEx"
                  className="form-control"
                  name="name"
                  value={this.state.data.name}
                  onChange={this.handleChange}
                />
                <br />

                <label
                  htmlFor="defaultFormContactMessageEx"
                  className="grey-text"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  id="defaultFormContactMessageEx"
                  className="form-control"
                  rows="3"
                  name="description"
                  value={this.state.data.description}
                  onChange={this.handleChange}
                />
                <div className="text-center mt-4">
                  <MDBBtn
                    color="warning"
                    outline
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Save
                    <MDBIcon icon="dumbbell" far className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default CreateExercise;
