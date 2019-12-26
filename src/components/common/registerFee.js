import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "./reForm";
import Joi from "joi-browser";
import Attendance from "./attendance";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline,
  MDBBadge
} from "mdbreact";

import { getFees, getFee, saveFee } from "../../service/feeService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getMembers } from "../../service/memberService";

class RegisterFee extends Form {
  state = {
    data: {
      member_id: "",
      feeMonth: "",
      amountPaid: "",

      advancedFee: "",
      feeStatus: ""
    },
    errors: {},
    fees: [],
    members: [],
    startDate: new Date(),
    radio: ""
  };
  schema = {
    member_id: Joi.required().label("Member"),
    feeMonth: Joi.required().label("Date"),
    amountPaid: Joi.number()
      .required()
      .label("Amount Paid"),
    advancedFee: Joi.number()
      .required()
      .label("Advanced Fee"),
    feeStatus: Joi.required().label("Fee Status")
  };

  feeHandler = nr => e => {
    this.state.data.feeStatus = e.currentTarget.name;
    this.setState({
      radio: nr
    });
  };

  dateHandler = date => {
    this.state.data.feeMonth = date.toLocaleDateString("en-US");

    this.setState({
      startDate: date
    });
  };

  // handleChange = e => {
  //   e.preventDefault();
  //   const data = { ...this.state.data };

  //   data[e.currentTarget.name] = e.currentTarget.value;

  //   this.setState({ data });
  // };

  async componentDidMount() {
    const { data: fees } = await getFees();
    // fees.forEach(feeMember => console.log("forEach", feeMember.member._id));
    this.setState({ fees });
    const { data: members } = await getMembers();
    this.setState({ members });

    const feeId = this.props.match.params.id;
    if (feeId === "new") return;
    const { data: fee } = await getFee(feeId);
    this.setState({ data: this.mapToViewModel(fee) });
    console.log(fee);
  }
  handleSubmit = async () => {
    console.log("clicked");
    console.log(this.state.data);
    try {
      await saveFee(this.state.data);
      this.props.history.push("/fee");
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
      _id: result._id,
      member_id: result.member._id,
      //name: result.member.name,
      feeMonth: result.feeMonth,
      amountPaid: result.amountPaid,
      feeDue: result.feeDue,
      advancedFee: result.advancedFee,
      feeStatus: result.feeStatus,
      monthlyFee: result.member.monthlyFee,
      totalAmount: result.totalAmount
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
                <p className="h5 text-center mb-4">Fee</p>
                <div className="grey-text">
                  {this.props.match.params.id === "new" &&
                    this.renderSelect(
                      "member_id",
                      "Members",
                      this.state.members
                    )}
                  {this.state.errors.member_id && (
                    <div className="alert alert-danger">
                      {this.state.errors.member_id}
                    </div>
                  )}
                  <MDBInput
                    name="amountPaid"
                    label="Amount Paid"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.amountPaid}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.amountPaid && (
                    <div className="alert alert-danger">
                      {this.state.errors.amountPaid}
                    </div>
                  )}

                  <MDBInput
                    name="advancedFee"
                    label="Advanced Fee"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.advancedFee}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.advancedFee && (
                    <div className="alert alert-danger">
                      {this.state.errors.advancedFee}
                    </div>
                  )}

                  <label>Fee Status</label>

                  <MDBFormInline>
                    <MDBInput
                      label="Paid"
                      name="paid"
                      icon="check"
                      group
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      onClick={this.feeHandler(1)}
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
                      onClick={this.feeHandler(2)}
                      checked={this.state.radio === 2 ? true : false}
                    />
                  </MDBFormInline>
                  <MDBBadge color="secondary">Fee Date</MDBBadge>
                  <br />
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateHandler}
                    name="feeMonth"
                    dateFormat="MMMM d , yyyy "
                  />
                  {this.state.errors.feeMonth && (
                    <div className="alert alert-danger">
                      {this.state.errors.feeMonth}
                    </div>
                  )}
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

export default RegisterFee;

// <MDBInput
// name="totalAmount"
// label="Total Amount"
// icon="money-bill-alt"
// group
// type="text"
// validate
// error="wrong"
// success="right"
// value={this.state.data.totalAmount}
// onChange={this.handleChange}
// />

// <MDBInput
// name="feeDue"
// label="Amount Due"
// icon="money-bill-alt"
// group
// type="text"
// validate
// error="wrong"
// success="right"
// value={this.state.data.feeDue}
// onChange={this.handleChange}
// />
