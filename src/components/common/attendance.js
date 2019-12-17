// import React, { Component } from "react";
// import { MDBBtn } from "mdbreact";
// import moment from "moment";

// class Attendance extends Component {
//   state = {
//     checkOut: 0,
//     total: 0
//   };
//   handleCheckIn = () => {
//     let time = moment().locale("en");
//     // let t0 = time.getHours();
//     this.setState({ checkIn: time });
//     console.log("state", this.state.checkIn);
//     // console.log("state", this.state.checkIn);
//     //console.log("hour", t0);
//   };
//   handleCheckOut = () => {
//     let time = new Date();
//     let t1 = time.getSeconds();
//     this.setState({ checkOut: t1 });
//     console.log(this.state.checkOut);
//   };
//   handleTotal = () => {
//     let { checkIn, checkOut } = this.state;
//     let total = checkOut - checkIn;
//     this.setState({ total });
//     console.log(this.state.total);
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <MDBBtn onClick={this.handleCheckIn} outline color="primary" size="sm">
//           CheckIn
//         </MDBBtn>

//         <MDBBtn onClick={this.handleCheckOut} outline color="danger" size="sm">
//           CheckOut
//         </MDBBtn>
//         <MDBBtn onClick={this.handleTotal} outline color="primary" size="sm">
//           Total
//         </MDBBtn>
//       </React.Fragment>
//     );
//   }
// }

// export default Attendance;
