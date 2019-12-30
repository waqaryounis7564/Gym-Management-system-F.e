import React, { Component } from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
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

import {
  getSalaries,
  getSalary,
  saveSalary
} from "../../service/salaryService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

import { getTrainers } from "../../service/trainerService";

class RegisterSalary extends Form {
  state = {
    data: {
      salaryMonth: "",
      salaryAmount: "",
      salaryDue: "",
      advancedSalary: "",
      trainer_id: "",
      salaryStatus: ""
    },

    salaries: [],
    trainers: [],
    startDate: new Date()
  };

  salaryHandler = salary => {
    const data = { ...this.state.data };
    data.salaryStatus = salary;

    this.setState({
      data
    });
    console.log(data);
  };

  dateHandler = date => {
    this.state.data.salaryMonth = date.toLocaleDateString("en-US");

    this.setState({
      startDate: date
    });
  };

  handleChange = e => {
    e.preventDefault();
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };

  async componentDidMount() {
    console.log("registerSalried");
    const { data: salaries } = await getSalaries();
    this.setState({ salaries });
    const { data: trainers } = await getTrainers();
    this.setState({ trainers });

    const salaryId = this.props.match.params.id;
    if (salaryId === "new") return;
    const { data: salary } = await getSalary(salaryId);
    this.setState({ data: this.mapToViewModel(salary) });
    console.log(salary);
  }
  handleSubmit = async () => {
    try {
      console.log("clicked");
      console.log(this.state.data);
      await saveSalary(this.state.data);
      this.props.history.push("/salary");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        toast.error("Trainer already exist");
      } else if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
    }
  };
  mapToViewModel = result => {
    return {
      _id: result._id,
      trainer_id: result.trainer._id,
      //name: result.trainer.name,
      salaryMonth: result.salaryMonth,
      salaryAmount: result.salaryAmount,
      salaryDue: result.salaryDue,
      advancedSalary: result.advancedSalary,
      salaryStatus: result.salaryStatus
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
                <p className="h5 text-center mb-4">salary</p>
                <div className="grey-text">
                  {this.props.match.params.id === "new" &&
                    this.renderSelect(
                      "trainer_id",
                      "trainers",
                      this.state.trainers
                    )}

                  <MDBInput
                    name="salaryAmount"
                    label="salary Amount"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.salaryAmount}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    name="salaryDue"
                    label="salary Due"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.salaryDue}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    name="advancedSalary"
                    label="Advanced salary"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.advancedSalary}
                    onChange={this.handleChange}
                  />

                  <InputLabel id="simple-select-label">
                    Salary Status
                  </InputLabel>
                  <br />
                  <Select
                    autoWidth={true}
                    displayEmpty={true}
                    renderValue={() => this.state.data.salaryStatus}
                    name="salaryStatus"
                    label="simple-select-label"
                    id="simple-select"
                    value={this.state.data.salaryStatus}
                    onChange={({ target }) => this.salaryHandler(target.value)}
                  >
                    <MenuItem value={"paid"}>paid</MenuItem>
                    <MenuItem value={"unpaid"}>unpaid</MenuItem>
                  </Select>

                  <br />
                  <br />

                  <MDBBadge color="secondary">salary Date</MDBBadge>
                  <br />

                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateHandler}
                    name="salaryMonth"
                    dateFormat="MMMM d, yyyy "
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.handleSubmit}>
                    Save
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

export default RegisterSalary;
