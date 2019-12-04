import React, { Component } from "react";
import moment from "moment";

import DatePicker from "react-datepicker";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline,
  MDBBadge
} from "mdbreact";

import "react-datepicker/dist/react-datepicker.css";

class FormRegistration extends Component {
  state = {
    startDate: new Date(),

    radio: ""
  };
  onClick = nr => e => {
    this.setState({
      radio: nr
    });
    this.props.user.gender = e.currentTarget.name;
  };
  handleChange = date => {
    this.props.user.dateOfJoining = date.getDate();
    // dateFormat = "MMMM d, yyyy h:mm aa";
    //date = moment(e);
    this.setState({
      startDate: date
    });
    console.log(this.state.startDate);
  };
  render() {
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">User</p>
                <div className="grey-text">
                  <MDBInput
                    name="name"
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.props.user.name}
                    onChange={this.props.onChange}
                  />
                  <MDBInput
                    name="cnic"
                    label="Your cnic"
                    icon="id-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.props.user.cnic}
                    onChange={this.props.onChange}
                  />
                  <MDBInput
                    name="age"
                    label="Your age"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.props.user.age}
                    onChange={this.props.onChange}
                  />
                  <MDBInput
                    name="mobile"
                    label="Your mobile"
                    icon="mobile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.props.user.mobile}
                    onChange={this.props.onChange}
                  />
                  <MDBFormInline>
                    <MDBInput
                      label="Male"
                      name="Male"
                      icon="male"
                      group
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      onClick={this.onClick(1)}
                      checked={this.state.radio === 1 ? true : false}
                    />
                    <MDBInput
                      icon="female"
                      label="Female"
                      name="Female"
                      group
                      type="radio"
                      id="radio2"
                      containerClass="mr-5"
                      onClick={this.onClick(2)}
                      checked={this.state.radio === 2 ? true : false}
                    />
                  </MDBFormInline>

                  <MDBBadge color="secondary">Joining Date</MDBBadge>
                  <br />

                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="dateOfJoining"
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.props.onSubmit}>
                    Register
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

export default FormRegistration;
