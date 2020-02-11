import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <React.Fragment>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={this.props.search}
        />
      </React.Fragment>
    );
  }
}

export default Search;
