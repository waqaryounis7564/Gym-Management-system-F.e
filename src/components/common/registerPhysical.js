import React from "react";
import { Dropdown, Grid, Segment } from "semantic-ui-react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import {
  getPhysicalRecord,
  savePhysicalRecord
} from "../../service/recordService";

import DatePicker from "react-datepicker";
import form from "./reForm";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBBadge
} from "mdbreact";

import "react-datepicker/dist/react-datepicker.css";
import { getMembers } from "../../service/memberService";
import { getExercises } from "../../service/exerciseService";
import { ToastContainer, toast } from "react-toastify";

class RegisterRecords extends form {
  state = {
    data: {
      exercise_id: "",
      member_id: "",
      month: "",
      height: "",
      weight: "",
      waist: "",
      bicep: "",
      triceps: "",
      chest: "",

      thigh: "",
      shoulders: ""
    },
    errors: {},
    members: [],
    exercises: [],
    startDate: new Date()
  };

  handleChangeExercises = (e, { value }) => {
    const data = { ...this.state.data };
    data.exercise_id = value;
    this.setState({ data });

    console.log(value);
  };
  handleChangeMembers = (e, { value }) => {
    const data = { ...this.state.data };
    data.member_id = value;
    this.setState({ data });

    console.log(value);
  };

  optionsExercises = () => {
    const { exercises } = this.state;
    return exercises.map(exercise => ({
      key: exercise.name,
      text: exercise.name,
      value: exercise._id
    }));
  };
  optionsMembers = () => {
    const { members } = this.state;
    return members.map(member => ({
      key: member.name,
      text: member.name,
      value: member._id
    }));
  };

  dateHandler = date => {
    this.state.data.month = date.toLocaleDateString("en-US");

    this.setState({
      startDate: date
    });
  };
  onChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });

    const { data: exercises } = await getExercises();
    this.setState({ exercises });

    const userId = this.props.match.params.id;
    if (userId === "new") return;
    const { data: user } = await getPhysicalRecord(userId);
    this.setState({ data: this.mapToViewModel(user) });
    console.log(user);
  }
  mapToViewModel = user => {
    return {
      _id: user._id,
      member_id: user.member._id,
      exercise_id: (function() {
        let assigns = [];
        for (let i = 0; i < user.exercises.length; i++) {
          assigns.push(user.exercises[i]._id);
        }
        console.log("map to view array", assigns);
        return assigns;
      })(),
      month: user.month,
      height: user.height,
      weight: user.weight,
      waist: user.waist,
      bicep: user.bicep,
      triceps: user.triceps,
      chest: user.chest,
      shoulders: user.shoulders,
      thigh: user.thigh
    };
  };

  doSubmit = async () => {
    try {
      console.log("clicked");
      console.log(this.state.data);
      await savePhysicalRecord(this.state.data);
      this.props.history.push("/physical");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        toast.error("Record has already registered ");
      } else if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
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
                <p className="h5 text-center mb-4">Physical Record</p>
                <div className="grey-text">
                  <div className="form-group">
                    {this.props.match.params.id === "new" && (
                      <div>
                        <InputLabel id="demo-simple-select-label">
                          Members
                        </InputLabel>
                        <Grid columns={2}>
                          <Grid.Column>
                            <Dropdown
                              placeholder="Members"
                              fluid
                              name="member_id"
                              selection
                              onChange={this.handleChangeMembers}
                              value={this.state.data.member_id}
                              options={this.optionsMembers()}
                            />
                          </Grid.Column>
                        </Grid>
                      </div>
                    )}

                    <InputLabel id="demo-simple-select-label">
                      Exercises
                    </InputLabel>
                    <br />
                    <Grid columns={2}>
                      <Grid.Column>
                        <Dropdown
                          placeholder="Exercises"
                          fluid
                          multiple
                          selection
                          onChange={this.handleChangeExercises}
                          value={this.state.data.exercise_id}
                          options={this.optionsExercises()}
                        />
                      </Grid.Column>
                    </Grid>
                  </div>
                  <MDBInput
                    name="height"
                    label="Your height"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.height}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="weight"
                    label="Your weight"
                    icon="id-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.weight}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="waist"
                    label="Your waist"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.waist}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="bicep"
                    label="Your bicep"
                    icon="bicep"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.bicep}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="triceps"
                    label="Your triceps"
                    icon="triceps"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.triceps}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="chest"
                    label="Your chest"
                    icon="chest"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.chest}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="shoulders"
                    label="Your shoulders"
                    icon="shoulders"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.shoulders}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="thigh"
                    label="Your thigh"
                    icon="thigh"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.thigh}
                    onChange={this.onChange}
                  />
                  <MDBBadge color="secondary">Record Date</MDBBadge>
                  <br />
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateHandler}
                    name="dateOfJoining"
                    dateFormat="MMMM d, yyyy "
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.doSubmit}>
                    Register
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

export default RegisterRecords;
