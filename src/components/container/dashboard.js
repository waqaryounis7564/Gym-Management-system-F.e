import React, { Component } from "react";

import Stat from "../common/stat";
import { getMovies } from "../../service/fakeMovieService";

class Dashboard extends Component {
  state = { movies: getMovies() };

  render() {
    console.log(this.state.movies);
    return (
      <div className="jumbotron-fluid">
        <Stat members={this.state.movies.length}></Stat>
      </div>
    );
  }
}

export default Dashboard;
