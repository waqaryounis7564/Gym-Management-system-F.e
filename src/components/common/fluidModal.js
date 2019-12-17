import React from "react";
import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBBtn,
  MDBContainer
} from "mdbreact";

const ModalPage = () => {
  return (
    <MDBContainer>
      <div style={{ display: "flex" }} className="m-5 p-5">
        <MDBPopover placement="left" popover clickable id="popper1">
          <MDBBtn>Details</MDBBtn>
          <div>
            <MDBPopoverHeader>popover on top</MDBPopoverHeader>
            <MDBPopoverBody>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </MDBPopoverBody>
          </div>
        </MDBPopover>
      </div>
    </MDBContainer>
  );
};

export default ModalPage;
