import React from "react";
import Button from "./button";

import { Link } from "react-router-dom";

const Table = ({ attendances, handleDelete }) => {
  return (
    <React.Fragment>
      <table className="table  table-hover  ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Check In</th>
            <th scope="col">Check Out</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {attendances.length === 0 ? (
            <React.Fragment>
              <div class="spinner-grow text-primary slow" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </React.Fragment>
          ) : (
            attendances.map(attendance => (
              <tr key={attendance._id}>
                <td>{attendances.indexOf(attendance) + 1}</td>

                <td>
                  <Link to={`/checkOut/${attendance._id}`}>
                    {attendance.user.name}
                  </Link>
                </td>
                <td>{attendance.checkIn}</td>
                <td>{attendance.checkOut}</td>

                <td>
                  <Button delete={() => handleDelete(attendance._id)} />
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
