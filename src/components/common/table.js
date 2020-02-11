import React, { Component } from "react";
import Button from "./button";

import { Link } from "react-router-dom";
import ModalPage from "./fluidModal";

//members, handleDelete

class Table extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <table className="table  table-hover  ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Gender</th>
              <th scope="col">Age</th>
              <th scope="col">CNIC</th>
              <th scope="col">Monthly Fee</th>
              <th scope="col">Joining Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.members.length === 0 ? (
              <React.Fragment>
                <div class="spinner-grow text-primary slow" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </React.Fragment>
            ) : (
              this.props.members.map(member => (
                <tr key={member._id}>
                  <td>{this.props.members.indexOf(member) + 1}</td>

                  <td>
                    <Link to={`/registerUser/${member._id}`}>
                      {member.name}
                    </Link>
                  </td>
                  <td>{member.mobile}</td>
                  <td>{member.gender}</td>
                  <td>{member.age}</td>
                  <td>{member.cnic}</td>
                  <td>{member.monthlyFee}</td>
                  <td>{member.dateOfJoining}</td>
                  <td>
                    <Button
                      delete={() => this.props.handleDelete(member._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
