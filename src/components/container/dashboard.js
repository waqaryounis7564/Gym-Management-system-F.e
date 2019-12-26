import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import React, { Component } from "react";
import "./dashboard.css";

import { getMembers } from "../../service/memberService";

class Dashboard extends Component {
  state = {
    id: "",
    name: "daspoid",
    members: []
  };
  handleChange = id => {
    this.setState({ id: id[0], name: id[1] });
    console.log(id);
  };
  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });
    this.options();
  }
  options = () => {
    const { members } = this.state;
    const MenuItems = members.map(member => (
      <MenuItem value={[member._id, member.name]}>{member.name}</MenuItem>
    ));
    return MenuItems;
  };
  render() {
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        <FormControl className="formControl">
          <label>Members</label>
          <Select
            autoWidth={true}
            // multiple={true}
            renderValue={() => this.state.name}
            displayEmpty={true}
            name="my member"
            label="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.id}
            onChange={({ target }) => this.handleChange(target.value)}
          >
            <MenuItem value={""}>None</MenuItem>
            {this.options()}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Dashboard;
// <MenuItem value={30}>Thirty</MenuItem>

// <MDBContainer fluid>
//           <MDBCarousel
//             activeItem={1}
//             length={3}
//             showControls={true}
//             showIndicators={true}
//             className="z-depth-1 grid"
//           >
//             <MDBCarouselInner>
//               <MDBCarouselItem itemId="1">
//                 <MDBView>
//                   <img
//                     className="d-block w-50 h-50"
//                     src="https://images.unsplash.com/photo-1517344687790-7338f238f7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80"
//                     alt="First slide"
//                   />
//                 </MDBView>
//               </MDBCarouselItem>
//               <MDBCarouselItem itemId="2">
//                 <MDBView>
//                   <img
//                     className="d-block w-50 h-50"
//                     src="https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
//                     alt="Second slide"
//                   />
//                 </MDBView>
//               </MDBCarouselItem>
//               <MDBCarouselItem itemId="3">
//                 <MDBView>
//                   <img
//                     className="d-block w-50 h-50"
//                     src="https://images.unsplash.com/photo-1526407153035-415201c1ba3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
//                     alt="Third slide"
//                   />
//                 </MDBView>
//               </MDBCarouselItem>
//             </MDBCarouselInner>
//           </MDBCarousel>
//         </MDBContainer>
