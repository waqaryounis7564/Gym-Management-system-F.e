import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

const SalaryTable = ({ salaries, onDelete }) => {
  return (
    <React.Fragment>
      <Table hover>
        <thead className="table-warning">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th> Salary Status</th>
            <th>salary Month</th>
            <th>Pending</th>
            <th>Advanced</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salaries.length === 0 ? (
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            salaries.map(salary => (
              <tr key={salary._id}>
                <td>{salaries.indexOf(salary) + 1}</td>

                <td>
                  <Link to={`/getsalary/${salary._id}`}>
                    {salary.trainer.name}
                  </Link>
                </td>
                <td>{salary.salaryAmount}</td>
                <td>{salary.salaryStatus}</td>
                <td>{salary.salaryMonth}</td>
                <td>{salary.salaryDue}</td>
                <td>{salary.advancedSalary}</td>

                <td>
                  <MDBBtn
                    onClick={() => onDelete(salary._id)}
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

export default SalaryTable;
