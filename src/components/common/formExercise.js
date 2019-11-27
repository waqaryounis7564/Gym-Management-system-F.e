import React, { Component } from "react";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

class CreateExercise extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h4 text-center mb-4">Create Exercise</p>
                <label htmlFor="defaultFormContactNameEx" className="grey-text">
                  Exercise Type
                </label>
                <input
                  type="text"
                  id="defaultFormContactNameEx"
                  className="form-control"
                />
                <br />
                <label
                  htmlFor="defaultFormContactEmailEx"
                  className="grey-text"
                >
                  Exercise Name
                </label>
                <input
                  type="text"
                  id="defaultFormContactEmailEx"
                  className="form-control"
                />
                <br />

                <label
                  htmlFor="defaultFormContactMessageEx"
                  className="grey-text"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  id="defaultFormContactMessageEx"
                  className="form-control"
                  rows="3"
                />
                <div className="text-center mt-4">
                  <MDBBtn color="warning" outline type="submit">
                    Save
                    <MDBIcon far icon="paper-plane" className="ml-2" />
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

export default CreateExercise;
