import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Table from "../common/pRecordsTable";
// import BtnR from "../common/buttonR";
// import {
//   getPhysicalRecords,
//   deletePhysicalRecord
// } from "../../service/recordService";

class Reports extends Component {
  state = { records: [] };
  //   async componentDidMount() {
  //     const { data: records } = await getPhysicalRecords();
  //     this.setState({ records });
  //   }
  //   handleDelete = async id => {
  //     const originalState = this.state.records;
  //     const physicalRecord = this.state.records.filter(
  //       physicalRecord => physicalRecord._id !== id
  //     );
  //     this.setState({ records: physicalRecord });

  //     try {
  //       const { data: physicalRecord } = await deletePhysicalRecord(id);
  //     } catch (ex) {
  //       if (ex.response && ex.response.status < 500)
  //         console.log("record already deleted");
  //       this.setState({ records: originalState });
  //     }
  //   };
  render() {
    return (
      <div>
        <h1>Reports</h1>
      </div>
    );
  }
}

export default Reports;

// <Link to="/registerphysicalRecord/new">
//   <BtnR name="Enter new physicalRecord"></BtnR>
// </Link>

// <Table
//   records={this.state.records}
//   handleDelete={this.handleDelete}
// ></Table>
