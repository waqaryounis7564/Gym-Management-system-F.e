import React from "react";
import Form from "./reForm";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline
} from "mdbreact";

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

  equipmentHandler = nr => e => {
    this.state.data.equipmentAvailability = e.currentTarget.name;
    this.setState({
      radio: nr
    });
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
    console.log("clicked");
    console.log(this.state.data);
    await saveEquipment(this.state.data);
    this.props.history.push("/equipment");
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

                  <label>equipment Status</label>

                  <MDBFormInline>
                    <MDBInput
                      label="Available"
                      name="available"
                      icon="check"
                      group
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      onClick={this.equipmentHandler(1)}
                      checked={this.state.radio === 1 ? true : false}
                    />
                    <MDBInput
                      icon="times"
                      label="UnAvailable"
                      name="unavailable"
                      group
                      type="radio"
                      id="radio2"
                      containerClass="mr-5"
                      onClick={this.equipmentHandler(2)}
                      checked={this.state.radio === 2 ? true : false}
                    />
                  </MDBFormInline>
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
