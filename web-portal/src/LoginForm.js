import React from "react";
// Realm
import * as Realm from "realm-web";
import assert from "assert";

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
    console.log(target.name + " " + target.value)
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" id="email" name="username" onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name.lastname@company.com" required/>
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" id="password" name="password" onChange={this.handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <button type="submit" value="Login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
      </div>
    );
  }
}
