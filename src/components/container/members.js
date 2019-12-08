import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import {
  getMembers,
  deleteMember,
  saveMember
} from "../../service/memberService";

import { ToastContainer, toast } from "react-toastify";

import Table from "../common/table";

class Member extends Component {
  state = {
    members: [],

    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      exerciseId: ""
    },
    errors: {}
  };

  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });
    // console.log("members are", members);
    // const memberId = this.props.match.params.id;
    // if (memberId === "new") return;
    // const member = await getMember(memberId);
    // memberId && console.log(member.exercisesAssigned._id);
    // this.setState({ data: this.mapToViewModel(member) });
  }
  // mapToViewModel = member => {
  //   return {
  //     _id: member._id,
  //     name: member.name,
  //     mobile: member.mobile,
  //     gender: member.gender,
  //     cnic: member.cnic,
  //     dateOfJoining: member.dateOfJoining,
  //     exerciseId: member.exercisesAssigned._id
  //   };
  // };
  doSubmit = async () => {
    await saveMember(this.state.data);

    this.props.history.push("/member");
  };
  handleDelete = async id => {
    const originalState = this.state.members;
    const member = this.state.members.filter(member => member._id !== id);
    this.setState({ members: member });

    try {
      await deleteMember(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        toast("movie already deleted");
      this.setState({ members: originalState });
    }
  };
  render() {
    const { members, exercises } = this.state;

    return (
      <div>
        <ToastContainer></ToastContainer>
        <h1>Members</h1>
        <Link to="/registerUser/new">
          <MDBBtn gradient="purple">Register New User</MDBBtn>
        </Link>
        <Table
          members={members}
          exercises={exercises}
          handleDelete={this.handleDelete}
        ></Table>
      </div>
    );
  }
}

export default Member;
