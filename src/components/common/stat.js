import React, { Component } from "react";
import { Icon, Image, Statistic } from "semantic-ui-react";

class Stat extends Component {
  state = {
    members: [],
    trainers: [],
    attendances: [],
    fees: [],
    salaries: [],
    availableTrainers: "",
    debit: "",
    credit: ""
  };
  async componentDidMount() {}
  render() {
    const { members } = this.state;
    return (
      <React.Fragment>
        <Statistic.Group widths="four">
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Saves</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              Three
              <br />
              Thousand
            </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name="users" />
              {members}
            </Statistic.Value>
            <Statistic.Label>Members</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Image
                src="/images/avatar/small/joe.jpg"
                className="circular inline"
              />
              42
            </Statistic.Value>
            <Statistic.Label>Team Members</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </React.Fragment>
    );
  }
}

export default Stat;
