import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BtnR from "../common/buttonR";

import {
  getRegisterServices,
  deleteRegisterService
} from "../../service/t&mService";
import Table from "../common/serviceTable";

class Services extends Component {
  state = { services: [] };

  async componentDidMount() {
    const { data: services } = await getRegisterServices();
    this.setState({ services });
  }

  handleDelete = async id => {
    const originalState = this.state.services;
    const service = this.state.services.filter(service => service._id !== id);
    this.setState({ services: service });

    try {
      await deleteRegisterService(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        toast("Service already deleted");
      this.setState({ services: originalState });
    }
  };
  render() {
    return (
      <div>
        <h1>Services</h1>
        <Link to="/registerService/new">
          <BtnR name="Assign new Trainer"></BtnR>
        </Link>
        <Table
          services={this.state.services}
          handleDelete={this.handleDelete}
        ></Table>
      </div>
    );
  }
}

export default Services;
