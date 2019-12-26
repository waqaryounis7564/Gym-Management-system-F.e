import React from "react";
import Button from "./button";

import { Link } from "react-router-dom";

const Table = ({ trainers, handleDelete }) => {
  return (
    <React.Fragment>
      <table className="table  table-hover  ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Member Assigned</th>
            <th scope="col">Mobile</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col">CNIC</th>
            <th scope="col">Joining Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {trainers.length === 0 ? (
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>:
            </div>
          ) : (
            trainers.map(trainer => (
              <tr key={trainer._id}>
                <td>{trainers.indexOf(trainer) + 1}</td>

                <td>
                  <Link to={`/registerTrainer/${trainer._id}`}>
                    {trainer.name}
                  </Link>
                </td>
                <td>{trainer.memberAssigned.name}</td>
                <td>{trainer.mobile}</td>
                <td>{trainer.gender}</td>
                <td>{trainer.age}</td>
                <td>{trainer.cnic}</td>
                <td>{trainer.dateOfJoining}</td>
                <td>
                  <Button delete={() => handleDelete(trainer._id)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
