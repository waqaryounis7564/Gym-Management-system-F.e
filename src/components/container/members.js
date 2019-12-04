import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import {
  getMembers,
  deleteMember,
  getMember
} from "../../service/memberService";
import { getExercises } from "../../service/exerciseService";

import Table from "../common/table";

class Member extends Component {
  state = {
    members: [],
    exercises: [],
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      exercise_id: ""
    },
    errors: {}
  };

  async componentDidMount() {
    const exercises = await getExercises();
    this.setState({ exercises });
    const { data: members } = await getMembers();
    this.setState({ members });

    const memberId = this.props.match.params.id;
    if (memberId === "new") return;

    const member = await getMember(memberId);
    this.setState({ data: this.mapToViewModel(member) });
  }
  mapToViewModel = member => {
    return {
      _id: member._id,
      name: member.name,
      mobile: member.mobile,
      gender: member.gender,
      cnic: member.cnic,
      dateOfJoining: member.dateOfJoining
      // exercise_id: member.exercisesAssigned._id
    };
  };
  doSubmit = () => {
    //save movie on db use member service
    this.props.history.push("/member");
  };
  handleDelete = async id => {
    const originalState = this.state.members;
    const member = this.state.members.filter(member => member._id !== id);
    this.setState({ members: member });

    try {
      const { data: member } = await deleteMember(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        console.log("movie already deleted");
      this.setState({ members: originalState });
    }
  };
  render() {
    const { members } = this.state;

    return (
      <div>
        <h1>Members</h1>
        <Link to="/registerUser/new">
          <MDBBtn gradient="purple">Register New User</MDBBtn>
        </Link>
        <Table
          members={this.state.members}
          handleDelete={this.handleDelete}
        ></Table>
        }
      </div>
    );
  }
}

export default Member;
