import React, { Component } from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { getTrainers } from "../../service/trainerService";
import { getMembers } from "../../service/memberService";
import { Dropdown, Grid, Segment } from "semantic-ui-react";

import { ToastContainer, toast } from "react-toastify";

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
import {
  saveRegisterService,
  getRegisterService
} from "../../service/t&mService";

class ServiceRegistration extends Component {
  state = {
    data: {
      trainer_id: "",
      assignedDate: "",
      assignedMembers_id: "",
      trainerName: ""
    },

    services: [],
    members: [],
    trainers: [],
    startDate: new Date()
  };
  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });

    const { data: trainers } = await getTrainers();
    this.setState({ trainers });

    const userId = this.props.match.params.id;
    if (userId === "new") return;
    const { data: user } = await getRegisterService(userId);
    this.setState({ data: this.mapToViewModel(user) });
    console.log(user);
  }

  dateHandler = date => {
    const data = { ...this.state.data };

    let time = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    data.assignedDate = time;

    this.setState({
      startDate: date,
      data
    });
  };

  handleChangeMembers = (e, { value }) => {
    const data = { ...this.state.data };
    data.assignedMembers_id = value;
    this.setState({ data });
    //this.setState({ assignedMembers_id: value });
    console.log(value);
  };

  handleChangeTrainer = id => {
    const data = { ...this.state.data };
    data.trainer_id = id[0];
    data.trainerName = id[1];
    console.log(id[0]);
    this.setState({ data });
    console.log(id[1]);
  };

  optionsMembers = () => {
    const { members } = this.state;
    return members.map(member => ({
      key: member.name,
      text: member.name,
      value: member._id
    }));
  };

  optionsTrainers = () => {
    const { trainers } = this.state;
    const MenuItems = trainers.map(trainer => (
      <MenuItem value={[trainer._id, trainer.name]}>{trainer.name}</MenuItem>
    ));
    return MenuItems;
  };

  onChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };

  mapToViewModel = user => {
    return {
      _id: user._id,

      assignedMembers_id: (function() {
        let assigns = [];
        for (let i = 0; i < user.members.length; i++) {
          assigns.push(user.members[i]._id);
        }
        console.log("map to view array", assigns);
        return assigns;
      })(),
      assignedDate: user.assignedDate,
      trainerName: user.trainerName
    };
  };

  doSubmit = async () => {
    try {
      console.log("clicked");
      console.log(this.state.data);
      await saveRegisterService(this.state.data);
      this.props.history.push("/service");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        toast("Trainer already registered");
      } else if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                {this.props.match.params.id === "new" && (
                  <div className="form-group">
                    <InputLabel id="demo-simple-select-label">
                      Trainers
                    </InputLabel>
                    <Select
                      className="form-control"
                      autoWidth={true}
                      displayEmpty={true}
                      renderValue={() => this.state.data.trainerName}
                      name="trainer_id"
                      label="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.data.trainer_id}
                      onChange={({ target }) =>
                        this.handleChangeTrainer(target.value)
                      }
                    >
                      <MenuItem value={" "}>None</MenuItem>
                      {this.optionsTrainers()}
                    </Select>
                  </div>
                )}

                <InputLabel id="demo-simple-select-label">Members</InputLabel>
                <Grid columns={2}>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Members"
                      fluid
                      multiple
                      selection
                      onChange={this.handleChangeMembers}
                      value={this.state.data.assignedMembers_id}
                      options={this.optionsMembers()}
                    />
                  </Grid.Column>
                </Grid>
                <MDBBadge color="secondary">Joining Date</MDBBadge>
                <br />
                <DatePicker
                  selected={this.state.startDate}
                  onChange={date => this.dateHandler(date)}
                  name="assignedDate"
                  dateFormat="MMMM d, yyyy "
                />
                {/*</div>*/}
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

export default ServiceRegistration;
