import React, { Component } from "react";

import Joi from "joi-browser";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;
    let errors = {};
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
  };
  handleChange = e => {
    const account = { ...this.state.account };
    const errors = { ...this.state.errors };
    account[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ account, errors });
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  name="email"
                  autoFocus
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.account.email}
                  onChange={this.handleChange}
                />
                {this.state.errors.email && (
                  <div className="alert alert-danger">
                    {this.state.errors.email}
                  </div>
                )}

                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.account.password}
                  onChange={this.handleChange}
                />
                {this.state.errors.password && (
                  <div className="alert alert-danger">
                    {this.state.errors.password}
                  </div>
                )}

                <Button
                  // disabled={this.validate()}
                  onClick={this.handleClick}
                  color="teal"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Login;
