import React from "react";
import Form from "./reForm";
import { ToastContainer, toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline
} from "mdbreact";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";

import {
  getEquipments,
  getEquipment,
  saveEquipment
} from "../../service/equipmentService";

class RegisterEquipment extends Form {
  state = {
    data: {
      name: "",
      quantity: "",
      equipmentAvailability: "",
      description: ""
    },
    errors: {},
    equipments: [],

    radio: ""
  };

  equipmentHandler = equipment => {
    const data = { ...this.state.data };
    data.equipmentAvailability = equipment;

    this.setState({
      data
    });
    console.log(data);
  };

  handleChange = e => {
    e.preventDefault();
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };

  async componentDidMount() {
    const { data: equipments } = await getEquipments();
    this.setState({ equipments });

    const equipmentId = this.props.match.params.id;
    if (equipmentId === "new") return;
    const { data: equipment } = await getEquipment(equipmentId);
    this.setState({ data: this.mapToViewModel(equipment) });
    console.log(equipment);
  }
  handleSubmit = async () => {
    try {
      console.log("clicked");
      console.log(this.state.data);
      await saveEquipment(this.state.data);
      this.props.history.push("/equipment");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
    }
  };
  mapToViewModel = result => {
    return {
      name: result.name,
      quantity: result.quantity,
      equipmentAvailability: result.equipmentAvailability,
      description: result.description
    };
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">equipment</p>
                <div className="grey-text">
                  <MDBInput
                    name="name"
                    label="Name"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.name}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    name="quantity"
                    label="Quantity"
                    icon="money-bill-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.data.equipmentDue}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    type="textarea"
                    label="Description"
                    name="description"
                    rows="5"
                    value={this.state.data.description}
                    onChange={this.handleChange}
                  />

                  <InputLabel id="simple-select-label">
                    Equipment Status
                  </InputLabel>
                  <br />
                  <Select
                    autoWidth={true}
                    displayEmpty={true}
                    renderValue={() => this.state.data.equipmentAvailability}
                    name="equipmentAvailability"
                    label="simple-select-label"
                    id="simple-select"
                    value={this.state.data.equipmentAvailability}
                    onChange={({ target }) =>
                      this.equipmentHandler(target.value)
                    }
                  >
                    <MenuItem value={"available"}>available</MenuItem>
                    <MenuItem value={"unavailable"}>unavailable</MenuItem>
                  </Select>

                  <br />
                  <br />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.handleSubmit}>
                    Save
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

export default RegisterEquipment;
