import React from "react";
import Button from "./button";

import { getMovies } from "../../service/fakeMovieService";
import { Link } from "react-router-dom";
const movies = getMovies();

const Table = () => {
  return (
    <React.Fragment>
      <table className="table  table-hover  ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">NumberInStock</th>
            <th scope="col">dailyRentalRate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movies.indexOf(movie) + 1}</td>

              <td>{<Link to="/card">movie.title</Link>}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Button movie={movie} movies={movies} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
