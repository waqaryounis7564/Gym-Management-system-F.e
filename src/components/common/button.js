import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class Btn extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Button animated negative onClick={this.props.delete}>
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
