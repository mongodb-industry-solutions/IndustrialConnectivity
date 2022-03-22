import React from "react";
// Realm
import * as Realm from "realm-web";
import assert from "assert";

import { Button, Form } from "react-bootstrap";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async loginEmailPassword(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      // Authenticate the user
      const user = await this.props.app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      assert(user.id === this.props.app.currentUser.id);
      console.log(user);
      return user;
    } catch (err) {
      this.setState({loginError: `${err}`});
      console.error("Failed to log in", err);
    }
  }

  handleSubmit(event) {
    // Login Function
    this.loginEmailPassword(this.state.username, this.state.password).then(
      (user) => {
        this.props.setUser(user);
      }
    );

    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="username"
              onChange={this.handleInputChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button
            size="sm"
            variant="outline-success"
            type="submit"
            value="Login"
          >
            Login
          </Button>
        </Form>
        <p class="error">{this.state.loginError}</p>
      </div>
    );
  }
}
