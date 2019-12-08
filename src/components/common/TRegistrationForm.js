import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";

import DatePicker from "react-datepicker";
import Form from "./reForm";
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

class FormRegistration extends Form {
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

                  {this.renderSelect(
                    "assignedMember_id",
                    "Members",
                    this.props.members
                  )}

                  <MDBFormInline>
                    <MDBInput
                      label="Male"
                      name="Male"
                      icon="male"
                      group
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      onClick={this.props.onGenderChange(1)}
                      checked={this.props.radio === 1 ? true : false}
                    />
                    <MDBInput
                      icon="female"
                      label="Female"
                      name="Female"
                      group
                      type="radio"
                      id="radio2"
                      containerClass="mr-5"
                      onClick={this.props.onGenderChange(2)}
                      checked={this.props.radio === 2 ? true : false}
                    />
                  </MDBFormInline>

                  <MDBBadge color="secondary">Joining Date</MDBBadge>
                  <br />

                  <DatePicker
                    selected={this.props.date}
                    onChange={this.props.onDateChange}
                    name="dateOfJoining"
                    dateFormat="MMMM d, yyyy "
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
