import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class Btn extends Component {
  state = {};
  handleDelete = () => {
    const movie = this.props.movies.filter(
      movi => movi._id !== this.props.movie._id
    );
    console.log(movie);
  };
  render() {
    return (
      <React.Fragment>
        <Button animated negative onClick={this.handleDelete}>
          <Button.Content visible>Delete</Button.Content>
          <Button.Content hidden>
            <Icon name="user delete" />
          </Button.Content>
        </Button>
      </React.Fragment>
    );
  }
}

export default Btn;
