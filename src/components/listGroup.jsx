import React from "react";
import { genres } from "../fakeGenreService";

const ListGroup = ({ onSort, genreName }) => {
  return (
    <React.Fragment>
      <ul className="list-group">
        <li className="list-group-item">
          <a className="page-link" href="#" onClick={() => onSort("all")}>
            All Movies
          </a>
        </li>
        {genres.map(g => (
          <li
            className={
              genreName === g.name
                ? "list-group-item active"
                : "list-group-item"
            }
            key={g._id}
          >
            <a className="page-link" href="#" onClick={() => onSort(g.name)}>
              {g.name}
            </a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ListGroup;
