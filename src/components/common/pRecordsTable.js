import React from "react";
import Button from "./button";

import { Link } from "react-router-dom";

const Table = ({ records, handleDelete }) => {
  return (
    <React.Fragment>
      <div className="container">
        <table className="table  table-hover border  ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Exercise Assigned</th>
              <th scope="col">Month</th>
              <th scope="col">Height</th>
              <th scope="col">Weight</th>
              <th scope="col">Chest</th>
              <th scope="col">Shoulders</th>
              <th scope="col">Bicep</th>
              <th scope="col">Triceps</th>
              <th scope="col">Waist</th>
              <th scope="col">Thigh</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>:
              </div>
            ) : (
              records.map(record => (
                <tr key={record._id}>
                  <td>{records.indexOf(record) + 1}</td>

                  <td>
                    <Link to={`/registerphysical/${record._id}`}>
                      {record.member.name}
                    </Link>
                  </td>
                  <td>{record.exercise.name}</td>
                  <td>{record.month}</td>
                  <td>{record.height}</td>
                  <td>{record.weight}</td>
                  <td>{record.chest}</td>
                  <td>{record.shoulders}</td>
                  <td>{record.bicep}</td>
                  <td>{record.triceps}</td>
                  <td>{record.waist}</td>
                  <td>{record.thigh}</td>

                  <td>
                    <Button delete={() => handleDelete(record._id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
