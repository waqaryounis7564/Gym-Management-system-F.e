import React from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { getTrainer, saveTrainer } from "../../service/trainerService";
import { getMembers } from "../../service/memberService";

import DatePicker from "react-datepicker";
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

import "react-datepicker/dist/react-datepicker.css";

class FormRegistration extends Form {
  state = {
    data: {
      name: "",
      mobile: "",
      gender: "",
      age: "",
      cnic: "",
      dateOfJoining: "",
      assignedMember_id: "",
      memberName: ""
    },
    errors: {},
    members: [],
    startDate: new Date("this.state.data.dateOfJoining")
  };
  handleGender = gender => {
    const data = { ...this.state.data };
    data.gender = gender;

    this.setState({
      data
    });
    console.log(data);
  };

  dateHandler = date => {
    const data = { ...this.state.data };
    let time = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    data.dateOfJoining = time;
    console.log(time);

    this.setState({
      startDate: date,
      data
    });
  };
  onChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  handleChange = id => {
    const data = { ...this.state.data };
    data.assignedMember_id = id[0];
    data.memberName = id[1];
    console.log(id[0]);
    this.setState({ data });
    console.log(id[1]);
  };
  options = () => {
    const { members } = this.state;
    const MenuItems = members.map(member => (
      <MenuItem value={[member._id, member.name]}>{member.name}</MenuItem>
    ));
    return MenuItems;
  };
  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });

    const userId = this.props.match.params.id;
    if (userId === "new") return;
    const { data: user } = await getTrainer(userId);
    this.setState({ data: this.mapToViewModel(user) });
    console.log(user);
  }
  mapToViewModel = user => {
    return {
      _id: user._id,
      assignedMember_id: user.memberAssigned._id,
      name: user.name,
      mobile: user.mobile,
      cnic: user.cnic,
      gender: user.gender,
      age: user.age,
      dateOfJoining: user.dateOfJoining,
      memberName: user.memberAssigned.name
    };
  };

  doSubmit = async () => {
    console.log("clicked");
    console.log(this.state.data);
    await saveTrainer(this.state.data);
    this.props.history.push("/trainer");
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">User</p>
                <div className="grey-text">
                  <MDBInput
                    name="name"
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.name}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="cnic"
                    label="Your cnic"
                    icon="id-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.cnic}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="age"
                    label="Your age"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.age}
                    onChange={this.onChange}
                  />
                  <MDBInput
                    name="mobile"
                    label="Your mobile"
                    icon="mobile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.mobile}
                    onChange={this.onChange}
                  />

                  <div className="form-group">
                    <InputLabel id="demo-simple-select-label">
                      Members
                    </InputLabel>
                    <Select
                      className="form-control"
                      autoWidth={true}
                      displayEmpty={true}
                      renderValue={() => this.state.data.memberName}
                      name="assignedMember_id"
                      label="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.data.assignedMember_id}
                      onChange={({ target }) => this.handleChange(target.value)}
                    >
                      <MenuItem value={""}>None</MenuItem>
                      {this.options()}
                    </Select>
                  </div>

                  <InputLabel id="simple-select-label">Gender</InputLabel>
                  <Select
                    className="form-control"
                    autoWidth={true}
                    displayEmpty={true}
                    renderValue={() => this.state.data.gender}
                    name="gender"
                    label="simple-select-label"
                    id="simple-select"
                    value={this.state.data.gender}
                    onChange={({ target }) => this.handleGender(target.value)}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>

                  <br />
                  <br />

                  <MDBBadge color="secondary">Joining Date</MDBBadge>
                  <br />

                  <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.dateHandler(date)}
                    name="dateOfJoining"
                    dateFormat="MMMM d, yyyy "
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.doSubmit}>
                    Register
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

export default FormRegistration;

// <MDBFormInline>
// <MDBInput
//   label="Male"
//   name="Male"
//   icon="male"
//   group
//   type="radio"
//   id="radio1"
//   containerClass="mr-5"
//   onClick={this.genderHandler(1)}
//   checked={this.state.radio === 1 ? true : false}
// />
// <MDBInput
//   icon="female"
//   label="Female"
//   name="Female"
//   group
//   type="radio"
//   id="radio2"
//   containerClass="mr-5"
//   onClick={this.genderHandler(2)}
//   checked={this.state.radio === 2 ? true : false}
// />
// </MDBFormInline>
