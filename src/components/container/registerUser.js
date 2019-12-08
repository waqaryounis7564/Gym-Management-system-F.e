import React, { Component } from "react";
import FormRegistration from "../common/form";
import { getMember, saveMember } from "../../service/memberService";
import { getExercises } from "../../service/exerciseService";

import Form from "../common/reForm";

class RegisterUser extends Form {
  state = {
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      exercise_id: ""
    },
    errors: {},
    exercises: [],
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
      exercise_id: user.exercisesAssigned._id,
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
    await saveMember(this.state.data);
    this.props.history.push("/member");
    //   // try {
    //   //   await saveMember(this.state.data);
    //   // } catch (ex) {
    //   //   if (ex.response && ex.response.status < 500) console.log(ex);
    //   // }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Register User</h1>
        <FormRegistration
          user={this.state.data}
          exercises={this.state.exercises}
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

export default RegisterUser;
