import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import {
  getAttendances,
  deleteAttendance
} from "../../service/attendanceService";

import { ToastContainer, toast } from "react-toastify";

import Table from "../common/attendanceTable";

class attendance extends Component {
  state = {
    attendances: [],

    errors: {}
  };

  async componentDidMount() {
    document.body.id = "attendance";
    const { data: attendances } = await getAttendances();
    this.setState({ attendances });
  }

  handleDelete = async id => {
    const originalState = this.state.attendances;
    const attendance = this.state.attendances.filter(
      attendance => attendance._id !== id
    );
    this.setState({ attendances: attendance });

    try {
      await deleteAttendance(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        toast("Attendance already deleted");
      this.setState({ attendances: originalState });
    }
  };
  render() {
    const { attendances } = this.state;

    return (
      <div>
        <ToastContainer></ToastContainer>
        <h1>Attendances</h1>
        <Link to="/checkIn/new">
          <MDBBtn gradient="purple">Time Logging</MDBBtn>
        </Link>
        <Table
          attendances={attendances}
          handleDelete={this.handleDelete}
        ></Table>
      </div>
    );
  }
}

export default attendance;
