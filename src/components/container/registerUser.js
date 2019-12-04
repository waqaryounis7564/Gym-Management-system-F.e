import React, { Component } from "react";
import FormRegistration from "../common/form";
import { getMember, saveMember } from "../../service/memberService";

class RegisterUser extends Component {
  state = {
    members: [],
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      exercise_id: ""
    },
    trainers: []
  };
  onChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  async componentDidMount() {
    const userId = this.props.match.params.id;
    if (userId === "new") return;

    const { data: user } = await getMember(userId);
    this.setState({ data: this.mapToViewModel(user) });
  }
  mapToViewModel = user => {
    return {
      _id: user._id,
      //exerciseAssigned: user.exercisesAssigned._id,
      name: user.name,
      mobile: user.mobile,
      cnic: user.cnic,
      gender: user.gender,
      age: user.age,
      dateOfJoining: user.dateOfJoining
    };
  };
  doSubmit = async () => {
    console.log(this.state.data);
    this.props.history.push("/member");
    // try {
    //   await saveMember(this.state.data);
    // } catch (ex) {
    //   if (ex.response && ex.response.status < 500) console.log(ex);
    // }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Register User</h1>
        <FormRegistration
          user={this.state.data}
          onSubmit={this.doSubmit}
          onChange={this.onChange}
        ></FormRegistration>
      </React.Fragment>
    );
  }
}

export default RegisterUser;
