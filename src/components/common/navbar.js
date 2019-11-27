import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
        <Navbar.Brand>
          <Link style={{ color: "black" }} to="/dashboard">
            Dashboard
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to="/member">Members</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/trainer">Trainers</NavLink>
            </Nav.Link>
            <NavDropdown title="more" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/login">Login</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/salary">Salary</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/fee">Fee</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/exercise">Exercises</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
