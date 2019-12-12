import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

const EquipmentTable = ({ equipments, onDelete }) => {
  return (
    <React.Fragment>
      <Table hover>
        <thead className="table-warning">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th> EquipmentAvailability</th>
            <th>Description</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {equipments.length === 0 ? (
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            equipments.map(equipment => (
              <tr key={equipment._id}>
                <td>{equipments.indexOf(equipment) + 1}</td>

                <td>
                  <Link to={`/createequipment/${equipment._id}`}>
                    {equipment.name}
                  </Link>
                </td>
                <td>{equipment.quantity}</td>
                <td>{equipment.equipmentAvailability}</td>
                <td>{equipment.description}</td>

                <td>
                  <MDBBtn
                    onClick={() => onDelete(equipment._id)}
                    outline
                    color="danger"
                    size="sm"
                  >
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default EquipmentTable;
