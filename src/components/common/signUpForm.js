import React, { Component } from "react";
import { signUp } from "../../service/signUpService";
import Form from "./reForm";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class SignUpForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email")
      .trim()
      .email(),
    name: Joi.string()
      .required()
      .label("Name"),
    password: Joi.string()
      .required()
      .label("Password"),
    phone: Joi.string()
      .required()
      .label("Phone")
      .trim()
      .max(13)
  };

  doSubmit = async () => {
    const { data: admin } = await signUp(this.state.data);
    this.props.history.push("/");
    console.log(admin);
    // try {
    //   console.log("clicked");
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 400) {
    //     const errors = { ...this.state.errors };
    //     errors.email = ex.response.data;
    //     errors.name = ex.response.data;
    //     this.setState({ errors });
    //     toast.warning("user already exist with same id");
    //   }
    // }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <h1>SignUP</h1>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center py-4">Sign up</p>
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
                        onChange={this.handleChange}
                        value={this.state.data.name}
                      />
                      {this.state.errors.name && (
                        <div className="alert alert-danger">
                          {this.state.errors.name}
                        </div>
                      )}
                      <MDBInput
                        name="email"
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                        value={this.state.data.email}
                      />
                      {this.state.errors.email && (
                        <div className="alert alert-danger">
                          {this.state.errors.email}
                        </div>
                      )}
                      <MDBInput
                        name="phone"
                        label="Phone"
                        icon="mobile"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                        value={this.state.data.phone}
                      />
                      {this.state.errors.phone && (
                        <div className="alert alert-danger">
                          {this.state.errors.phone}
                        </div>
                      )}
                      <MDBInput
                        name="password"
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.data.password}
                        validate
                      />
                      {this.state.errors.password && (
                        <div className="alert alert-danger">
                          {this.state.errors.password}
                        </div>
                      )}
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn
                        color="cyan"
                        type="submit"
                        //disabled={this.validate}
                        onClick={this.handleSubmit}
                      >
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default SignUpForm;
