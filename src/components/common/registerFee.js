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

import { getFees, getFee, saveFee } from "../../service/feeService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getMembers } from "../../service/memberService";

class RegisterFee extends Form {
  state = {
    data: {
      feeMonth: "",
      feeAmount: "",
      feeDue: "",
      advancedFee: "",
      member_id: "",
      feeStatus: ""
    },
    errors: {},
    fees: [],
    members: [],
    startDate: new Date(),
    radio: "",
    status: [
      { name: "paid", value: true },
      { name: "unpaid", value: false }
    ]
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

  handleChange = e => {
    e.preventDefault();
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };

  async componentDidMount() {
    const { data: fees } = await getFees();
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
    await saveFee(this.state.data);
    this.props.history.push("/fee");
  };
  mapToViewModel = result => {
    return {
      _id: result._id,
      member_id: result.member._id,
      name: result.member.name,
      feeMonth: result.mobile,
      feeAmount: result.cnic,
      feeDue: result.gender,
      advancedFee: result.age,
      feeStatus: result.feeStatus
    };
  };
  render() {
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">Fee</p>
                <div className="grey-text">
                  {this.renderSelect(
                    "member_id",
                    "Members",
                    this.state.members
                  )}

                  <MDBInput
                    name="feeAmount"
                    label="Fee Amount"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.feeAmount}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    name="feeDue"
                    label="Fee Due"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.feeDue}
                    onChange={this.handleChange}
                  />
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
