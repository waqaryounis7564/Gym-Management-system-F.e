import React, { Component } from "react";
import Joi from "joi-browser";
import { getMember, saveMember } from "../../service/memberService";
import { getExercises } from "../../service/exerciseService";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Form from "./reForm";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline,
  MDBBadge
} from "mdbreact";

import "react-datepicker/dist/react-datepicker.css";

class FormRegistration extends Form {
  state = {
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      monthlyFee: "",
      dateOfJoining: ""
    },
    errors: {},
    exercises: [],
    startDate: new Date(),
    radio: ""
  };
  handleGender = gender => {
    const data = { ...this.state.data };
    data.gender = gender;

    this.setState({
      data
    });
    console.log(data);
  };

  dateHandler = date => {
    this.state.data.dateOfJoining = date.toLocaleDateString("en-US");

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
    const { data: exercises } = await getExercises();
    this.setState({ exercises });

    const userId = this.props.match.params.id;
    if (userId === "new") return;
    const { data: user } = await getMember(userId);
    this.setState({ data: this.mapToViewModel(user) });
    console.log(user);
  }
  mapToViewModel = user => {
    return {
      _id: user._id,

      name: user.name,
      mobile: user.mobile,
      cnic: user.cnic,
      gender: user.gender,
      age: user.age,
      monthlyFee: user.monthlyFee,
      dateOfJoining: user.dateOfJoining
    };
  };

  doSubmit = async () => {
    try {
      console.log("clicked");
      console.log(this.state.data);
      await saveMember(this.state.data);
      this.props.history.push("/member");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.info(ex.response.data);
      }
    }
    //   // try {
    //   //   await saveMember(this.state.data);
    //   // } catch (ex) {
    //   //   if (ex.response && ex.response.status < 500) console.log(ex);
    //   // }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">User</p>
                <div className="grey-text">
                  <MDBInput
                    name="name"
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.name}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="cnic"
                    label="Your cnic"
                    icon="id-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.cnic}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="age"
                    label="Your age"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.age}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="mobile"
                    label="Your mobile"
                    icon="mobile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.mobile}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="monthlyFee"
                    label="Monthly Fee"
                    icon="hand-holding-usd"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.monthlyFee}
                    onChange={this.onChange}
                  />

                  <InputLabel id="simple-select-label">Gender</InputLabel>
                  <br />
                  <Select
                    autoWidth={true}
                    displayEmpty={true}
                    renderValue={() => this.state.data.gender}
                    name="gender"
                    label="simple-select-label"
                    id="simple-select"
                    value={this.state.data.gender}
                    onChange={({ target }) => this.handleGender(target.value)}
                  >
                    <MenuItem value={" "}>None</MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                  <br />
                  <br />
                  <MDBBadge color="secondary">Joining Date</MDBBadge>
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

export default FormRegistration;
