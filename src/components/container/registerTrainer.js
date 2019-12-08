import React, { Component } from "react";
import FormRegistration from "../common/TRegistrationForm";
import Form from "../common/reForm";

import { getTrainer, saveTrainer } from "../../service/trainerService";
import { getMembers } from "../../service/memberService";

class RegisterTrainer extends Form {
  state = {
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      assignedMember_id: ""
    },
    errors: {},
    members: [],
    startDate: new Date(),
    radio: ""
  };
  genderHandler = nr => e => {
    this.state.data.gender = e.currentTarget.name;
    this.setState({
      radio: nr
    });
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
    const { data: members } = await getMembers();
    this.setState({ members });

    const userId = this.props.match.params.id;
    if (userId === "new") return;
    const { data: user } = await getTrainer(userId);
    this.setState({ data: this.mapToViewModel(user) });
    console.log(user);
  }
  mapToViewModel = user => {
    return {
      _id: user._id,
      assignedMember_id: user.memberAssigned._id,
      name: user.name,
      mobile: user.mobile,
      cnic: user.cnic,
      gender: user.gender,
      age: user.age,
      dateOfJoining: user.dateOfJoining
    };
  };

  doSubmit = async () => {
    console.log("clicked");
    console.log(this.state.data);
    await saveTrainer(this.state.data);
    this.props.history.push("/trainer");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register Trainer</h1>
        <FormRegistration
          user={this.state.data}
          members={this.state.members}
          onSubmit={this.doSubmit}
          onChange={this.onChange}
          onGenderChange={this.genderHandler}
          radio={this.state.radio}
          date={this.state.startDate}
          onDateChange={this.dateHandler}
        ></FormRegistration>
      </React.Fragment>
    );
  }
}

export default RegisterTrainer;
