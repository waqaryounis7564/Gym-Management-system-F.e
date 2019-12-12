import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
class Extable extends Component {
  state = {};
  render() {
    const { exercises, onDelete } = this.props;
    console.log(exercises);
    return (
      <React.Fragment>
        <Table hover>
          <thead className="table-warning">
            <tr>
              <th>#</th>
              <th>ExerciseType</th>
              <th> Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {exercises.length === 0 ? (
              <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              exercises.map(exercise => (
                <tr key={exercise._id}>
                  <td>{exercises.indexOf(exercise) + 1}</td>

                  <td>
                    <Link to={`/createexercise/${exercise._id}`}>
                      {exercise.exerciseType}
                    </Link>
                  </td>
                  <td>{exercise.name}</td>
                  <td>{exercise.description}</td>

                  <td>
                    <MDBBtn
                      onClick={() => onDelete(exercise._id)}
                      outline
                      size="sm"
                      color="danger"
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
  }
}

export default Extable;
