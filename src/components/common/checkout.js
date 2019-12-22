import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "./reForm";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBadge } from "mdbreact";

import { saveAttendance, getAttendance } from "../../service/attendanceService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CheckIn extends Form {
  state = {
    data: {
      checkOut: ""
    },
    startDate: new Date()
  };

  dateHandler = date => {
    let time = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    });

    this.setState({
      startDate: date
    });
    this.state.data.checkOut = time;
  };

  async componentDidMount() {
    const attendanceId = this.props.match.params.id;
    const { data: attendance } = await getAttendance(attendanceId);
    this.setState({ data: this.mapToViewModel(attendance) });
    console.log("sd", attendance);
  }

  handleSubmit = async () => {
    console.log("clicked");
    console.log(this.state.data);
    try {
      await saveAttendance(this.state.data);
      this.props.history.push("/attendance");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        toast.error("member already exist");
        //this.props.history.push("/fee");
      } else if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
    }
  };
  mapToViewModel = result => {
    return {
      _id: result._id
    };
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <div className="grey-text">
                  <MDBBadge color="danger">CheckOut</MDBBadge>
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
                    name="checkOut"
                  />
                </div>
                <br />

                <div className="text-left">
                  <MDBBtn color="danger" onClick={this.handleSubmit}>
                    Check Out
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
