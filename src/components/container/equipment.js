import React, { Component } from "react";
import { getEquipments, deleteEquipment } from "../../service/equipmentService";
import EquipmentTable from "../common/equipmentTable";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

class equipment extends Component {
  state = {
    equipments: []
  };
  async componentDidMount() {
    const { data: equipments } = await getEquipments();
    this.setState({ equipments });
  }
  handleDelete = async id => {
    const originalState = this.state.equipments;
    const equipment = this.state.equipments.filter(
      equipment => equipment._id !== id
    );
    this.setState({ equipments: equipment });

    try {
      await deleteEquipment(id);
    } catch (ex) {
      if (ex.response && ex.response.status < 500)
        console.log("equipment already deleted");
      this.setState({ equipments: originalState });
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>equipment</h1>
        <Link to="/createequipment/new">
          <MDBBtn gradient="purple">Add Equipments</MDBBtn>
        </Link>
        <EquipmentTable
          equipments={this.state.equipments}
          onDelete={this.handleDelete}
        ></EquipmentTable>
      </React.Fragment>
    );
  }
}

export default equipment;
