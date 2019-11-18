import React, { Component } from "react";

class Navbar extends Component {
  state = {};

  badgeColor() {
    const { length } = this.props.movies;
    return length === 0 ? "badge badge-warning" : "badge badge-info";
  }

  moviesLength() {
    const { length } = this.props.movies;
    return length === 0
      ? "There are no movies in the data-base"
      : "There are " + length + " movies in data-base";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <span className={this.badgeColor()}>{this.moviesLength()}</span>
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
