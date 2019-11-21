import React, { Component } from "react";
import FormRegistration from "../common/form";

class RegisterUser extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Register User</h1>
        <FormRegistration></FormRegistration>
      </React.Fragment>
    );
  }
}

export default RegisterUser;
