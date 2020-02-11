import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import {
  getMembers,
  deleteMember,
  saveMember
} from "../../service/memberService";

import { ToastContainer, toast } from "react-toastify";
import "./dashboard.css";
import Table from "../common/table";
import Search from "../common/search";

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
    document.body.id = "member";
    const { data: members } = await getMembers();
    this.setState({ members });
    console.log("stateMembers", members);
  }

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

  handleSearchChange = e => {
    console.log(e.target.value);
    let currentList = [];

    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.members;

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();

        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      newList = this.state.members;
      window.location.reload(false);
    }

    this.setState({ members: newList });
  };
  render() {
    const { members, exercises } = this.state;

    return (
      <div className="gradient">
        <ToastContainer></ToastContainer>
        <h1>Members</h1>
        <Search search={this.handleSearchChange}></Search>
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
