import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { MDBBtn } from "mdbreact";
import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBBtn,
  MDBContainer
} from "mdbreact";

class FeeTable extends Component {
  detail = id => {
    return (
      <MDBContainer>
        <div style={{ display: "flex" }} className="m-5 p-5">
          <MDBPopover placement="left" popover clickable id="popper1">
            <MDBBtn>Details</MDBBtn>
            <div>
              <MDBPopoverHeader>popover on top</MDBPopoverHeader>
              <MDBPopoverBody>
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </MDBPopoverBody>
            </div>
          </MDBPopover>
        </div>
      </MDBContainer>
    );
  };
  render() {
    const { fees, onDelete } = this.props;
    return (
      <React.Fragment>
        <Table hover>
          <thead className="table-warning">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Monthly Fee</th>
              <th>Amount Paid</th>
              <th> Fee Status</th>
              <th>Fee Month</th>
              <th>Pending</th>
              <th>Advanced</th>
              <th>Total Amount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fees.length === 0 ? (
              <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              fees.map(fee => (
                <tr key={fee._id}>
                  <td>{fees.indexOf(fee) + 1}</td>

                  <td>
                    <Link to={`/getfee/${fee._id}`}>{fee.member.name}</Link>
                  </td>
                  <td>{fee.member.monthlyFee}</td>
                  <td>{fee.amountPaid}</td>
                  <td>{fee.feeStatus}</td>
                  <td>{fee.feeMonth}</td>
                  <td>{fee.feeDue}</td>
                  <td>{fee.advancedFee}</td>
                  <td>{fee.totalAmount}</td>

                  <td>
                    <MDBBtn
                      onClick={() => onDelete(fee._id)}
                      outline
                      color="danger"
                      size="sm"
                    >
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default FeeTable;

// <td>
//   <Link to="/mf">
//     <MDBBtn
//       //onClick={() => this.detail(fee)}
//       outline
//       color="primary"
//       size="sm"
//     >
//       Details
//     </MDBBtn>
//   </Link>
// </td>
