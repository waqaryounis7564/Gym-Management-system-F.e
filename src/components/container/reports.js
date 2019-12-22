import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import { getReports } from "../../service/reportService";

class Reports extends Component {
  state = {
    items: []
  };
  async componentDidMount() {
    let items = [];
    const { data: records } = await getReports();
    let keys = Object.keys(records);

    for (let i = 1; i < 11; i++) {
      items.push({
        header: keys[i],
        description: records[keys[i]]
      });
    }
    this.setState({ items });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Reports</h1>
        <div className="container">
          <Card.Group itemsPerRow={4} color="red" items={this.state.items} />
        </div>
      </React.Fragment>
    );
  }
}

export default Reports;
