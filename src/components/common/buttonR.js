import React from "react";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
const BtnR = ({ name }) => {
  return (
    <React.Fragment>
      <MDBBtn color="secondary">{name}</MDBBtn>
    </React.Fragment>
  );
};

export default BtnR;
