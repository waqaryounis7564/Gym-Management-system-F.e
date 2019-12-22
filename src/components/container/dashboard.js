import React, { Component } from "react";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <MDBContainer>
            <MDBCarousel
              activeItem={1}
              length={3}
              showControls={true}
              showIndicators={true}
              className="z-depth-1"
            >
              <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1517344687790-7338f238f7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80"
                      alt="First slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Second slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1526407153035-415201c1ba3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Third slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          </MDBContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
