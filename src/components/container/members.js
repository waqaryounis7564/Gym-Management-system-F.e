import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import { getMembers } from "../../service/memberService";

import Table from "../common/table";

class Member extends Component {
  state = { members: [] };

  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });
  }

  render() {
    console.log(this.state.members);
    const { members } = this.state;

    return !members.length ? (
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    ) : (
      <div>
        <h1>Members</h1>
        <Link to="/registerUser">
          <MDBBtn gradient="purple">Register New User</MDBBtn>
        </Link>
        <Table members={this.state.members}></Table>}
      </div>
    );
  }
}

export default Member;
