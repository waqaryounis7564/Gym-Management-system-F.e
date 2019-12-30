import React from "react";
import Button from "./button";

import { Link } from "react-router-dom";

const Table = ({ services, handleDelete }) => {
  return (
    <React.Fragment>
      <table className="table  table-hover  ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Members Assigned</th>
            <th scope="col">Assigned Date</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td>{services.indexOf(service) + 1}</td>

              <td>
                <Link to={`/registerService/${service._id}`}>
                  {service.trainer.name}
                </Link>
              </td>
              <td>
                {service.members.map(member => (
                  <li key={member._id}>{member.name}</li>
                ))}
              </td>
              <td>{service.assignedDate}</td>

              <td>
                <Button delete={() => handleDelete(service._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
