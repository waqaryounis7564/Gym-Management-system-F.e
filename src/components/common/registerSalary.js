import React, { Component } from "react";
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
    errors: {},
    salaries: [],
    trainers: [],
    startDate: new Date(),
    radio: ""
  };

  salaryHandler = nr => e => {
    this.state.data.salaryStatus = e.currentTarget.name;
    this.setState({
      radio: nr
    });
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
                  <label>Salary Status</label>

                  <MDBFormInline>
                    <MDBInput
                      label="Paid"
                      name="paid"
                      icon="check"
                      group
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      onClick={this.salaryHandler(1)}
                      checked={this.state.radio === 1 ? true : false}
                    />
                    <MDBInput
                      icon="times"
                      label="Unpaid"
                      name="unpaid"
                      group
                      type="radio"
                      id="radio2"
                      containerClass="mr-5"
                      onClick={this.salaryHandler(2)}
                      checked={this.state.radio === 2 ? true : false}
                    />
                  </MDBFormInline>

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
