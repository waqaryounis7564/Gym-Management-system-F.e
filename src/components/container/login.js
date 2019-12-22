import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { signIn } from "../../service/loginService";
import { ToastContainer, toast } from "react-toastify";

import reForm from "../common/reForm";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends reForm {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email")
      .trim()
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
      .trim()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: user, headers } = await signIn(data.email, data.password);
      console.log(user);
      const token = headers["x-auth-token"];
      localStorage.setItem("jwt", token);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid UserName or Password");
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <img src="../../images/login.png" />
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your data
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
                  value={this.state.data.email}
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
                  value={this.state.data.password}
                  onChange={this.handleChange}
                />
                {this.state.errors.password && (
                  <div className="alert alert-danger">
                    {this.state.errors.password}
                  </div>
                )}

                <Button
                  disabled={this.validate()}
                  onClick={this.handleSubmit}
                  color="teal"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signupform">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Login;
