import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

class ExerciseCard extends Component {
  state = {};

  render() {
    return (
      <MDBContainer>
        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/photo7.jpg"
              waves
            />
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </MDBCardText>
              <Link to="/carddetails">
                <MDBBtn>Details</MDBBtn>
              </Link>

              <MDBBtn className="ml-5" color="danger">
                Delete
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default ExerciseCard;
