import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

const FeeTable = ({ fees, onDelete }) => {
  return (
    <React.Fragment>
      <Table hover>
        <thead className="table-warning">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th> Fee Status</th>
            <th>Fee Month</th>
            <th>Pending</th>
            <th>Advanced</th>
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
                <td>{fee.feeAmount}</td>
                <td>{fee.feeStatus}</td>
                <td>{fee.feeMonth}</td>
                <td>{fee.feeDue}</td>
                <td>{fee.advancedFee}</td>

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
};

export default FeeTable;
