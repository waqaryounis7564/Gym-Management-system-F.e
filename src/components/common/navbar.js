import React, { Component } from "react";
import Decode from "jwt-decode";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import { getMember, getMembers } from "../../service/memberService";

class NavBar extends Component {
  state = {};
  componentDidMount() {
    try {
      const token = localStorage.getItem("jwt");
      const user = Decode(token);
      this.setState({ user });
    } catch (error) {
      console.log("token is not available");
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.user && (
          <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
            <Navbar.Brand>
              <Link style={{ color: "black" }} to="/dashboard">
                Dashboard
              </Link>
            </Navbar.Brand>
            {this.state.user && (
              <Navbar.Brand>
                <Icon name="user"></Icon>
                <Link style={{ color: "black" }} to="/dashboard">
                  {this.state.user.name}
                </Link>
              </Navbar.Brand>
            )}

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <NavLink to="/member">Members</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/trainer">Trainers</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/attendance">Attendance</NavLink>
                </Nav.Link>
                <NavDropdown title="more" id="collasible-nav-dropdown">
                  {!this.state.user && (
                    <NavDropdown.Item>
                      <NavLink to="/login">Login</NavLink>
                    </NavDropdown.Item>
                  )}
                  {this.state.user && (
                    <NavDropdown.Item>
                      <NavLink to="/logout">Logout</NavLink>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item>
                    <NavLink to="/salary">Salary</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/fee">Fee</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/exercise">Exercises</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/equipment">Equipments</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/physical">Physical Records</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/report">Reports</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
