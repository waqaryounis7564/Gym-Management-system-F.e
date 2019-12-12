import React, { Component } from "react";
import { getSalaries, deleteSalary } from "../../service/salaryService";
import SalaryTable from "../common/salaryTable";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

class Salary extends Component {
  state = {
    salaries: []
  };
  async componentDidMount() {
    const { data: salaries } = await getSalaries();
    this.setState({ salaries });
  }
  handleDelete = async id => {
    const originalState = this.state.salaries;
    const salary = this.state.salaries.filter(salary => salary._id !== id);
    this.setState({ salaries: salary });

    try {
      await deleteSalary(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        console.log("salary already deleted");
      this.setState({ salaries: originalState });
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Salary</h1>
        <Link to="/getsalary/new">
          <MDBBtn gradient="purple">Pay Salary</MDBBtn>
        </Link>
        <SalaryTable
          salaries={this.state.salaries}
          onDelete={this.handleDelete}
        ></SalaryTable>
      </React.Fragment>
    );
  }
}

export default Salary;
