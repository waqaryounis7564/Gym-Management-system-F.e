import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "./reForm";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBadge,
  MDBIcon
} from "mdbreact";

import { saveAttendance, getAttendance } from "../../service/attendanceService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { getTrainers } from "../../service/trainerService";

class CheckIn extends Form {
  state = {
    data: {
      trainer_id: "",
      checkIn: ""
    },
    startDate: new Date(),
    trainers: []
  };

  dateHandler = date => {
    const data = { ...this.state.data };
    let time = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    });

    data.checkIn = time;
    this.setState({
      startDate: date,
      data
    });

    console.log(this.state.data.checkIn);
  };

  async componentDidMount() {
    const { data: trainers } = await getTrainers();
    this.setState({ trainers });

    // console.log(attendance);
  }

  //   handleCheckIn = () => {

  handleSubmit = async () => {
    console.log("clicked");
    console.log(this.state.data);
    try {
      await saveAttendance(this.state.data);
      this.props.history.push("/attendance");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        toast.error("member already exist");
        //this.props.history.push("/attendance");
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
                <br />
                <p className="h5 text-center mb-4">Attendance</p>

                <MDBBadge pill color="green">
                  <MDBIcon icon="users" size="2x" />
                </MDBBadge>
                <div className="grey-text">
                  {this.renderSelect(
                    "trainer_id",
                    "Trainers",
                    this.state.trainers
                  )}

                  <MDBBadge color="secondary">Time</MDBBadge>
                  <br />
                  <br />
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.dateHandler(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="Pp"
                    name="checkIn"
                  />
                </div>
                <br />

                <div className="text-left">
                  <MDBBtn color="primary" onClick={this.handleSubmit}>
                    Check In
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

export default CheckIn;
