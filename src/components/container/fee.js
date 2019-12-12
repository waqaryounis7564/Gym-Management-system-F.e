import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import FeeTable from "../common/feeTable";
import { getFees, deleteFee, getFee } from "../../service/feeService";

class Fee extends Component {
  state = {
    fees: []
  };
  async componentDidMount() {
    const { data: fees } = await getFees();
    this.setState({ fees });
  }

  handleDelete = async id => {
    const originalState = this.state.fees;
    const fee = this.state.fees.filter(fee => fee._id !== id);
    this.setState({ fees: fee });

    try {
      await deleteFee(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        console.log("fee already deleted");
      this.setState({ fees: originalState });
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Fee</h1>
        <Link to="/getfee/new">
          <MDBBtn gradient="purple">Get Fee</MDBBtn>
        </Link>
        <FeeTable
          fees={this.state.fees}
          onDelete={this.handleDelete}
        ></FeeTable>
      </React.Fragment>
    );
  }
}

export default Fee;
