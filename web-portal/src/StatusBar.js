import React from "react";

export class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    try {
      await this.props.app.currentUser.logOut();
      this.props.setUser(this.props.app.currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await this.app.currentUser.logOut();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <hr />
        <div class="container mx-auto">
          <button
            onClick={this.handleClick}
            size="sm"
            variant="outline-success"
            className="mb-5"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
