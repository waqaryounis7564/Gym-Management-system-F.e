import React, { Component } from "react";
import FormRegistration from "../common/TRegistrationForm";
import Form from "../common/reForm";

import { getTrainer, saveTrainer } from "../../service/trainerService";
import { getMembers } from "../../service/memberService";

class RegisterTrainer extends Component {
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
