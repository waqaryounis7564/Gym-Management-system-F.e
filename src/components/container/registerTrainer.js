import React, { Component } from "react";
import FormRegistration from "../common/form";

class RegisterTrainer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Register Trainer</h1>
        <FormRegistration></FormRegistration>
      </React.Fragment>
    );
  }
}

export default RegisterTrainer;
