// OrderFrom Component

import React from "react";

export class OrderForm extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      ship_from: "Barcelona, Spain",
      ship_to: "",
      color: "",
      firstName: "",
      lastName: "",
      orderStatus: "Order Submitted",
      timeStamp: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    let firstName = this.props.user.profile.email.substring(0, this.props.user.profile.email.indexOf("."));
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastName = this.props.user.profile.email.substring(this.props.user.profile.email.indexOf(".")+1, this.props.user.profile.email.indexOf("@"));
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const mongodb = this.props.app.currentUser.mongoClient("mongodb-atlas");
    const orders = mongodb.db("factory-shop").collection("neworders");
    orders
      .insertOne({
        ship_from: this.state.ship_from,
        ship_to: this.state.ship_to,
        color: this.state.color,
        userId: this.props.app.currentUser.id,
        firstName: firstName,
        lastName: lastName,
        orderStatus: this.state.orderStatus,
        timeStamp: new Date(),
      })
      .then((result) => console.log("Result: " + result));
    alert("A new order was submitted!");
    event.preventDefault();
  }


  render() {
    
    return (
      <div style={{justifyContent: 'center', width: '100%'}} >
        <div style={{justifyContent: 'center', width: '100%'}} class="flex justify-center">
          <div style={{justifyContent: 'center', width: '100%'}} class="block p-6 rounded-lg shadow-lg bg-white">
            <div class="container mx-auto" style={{justifyContent: 'center', width: '100%'}}>
            <form onSubmit={this.handleSubmit} style={{justifyContent: 'center', width: '100%'}}>
              <div class="min-w-max mb-4">
                <select name="ship_from" onChange={this.handleInputChange} value={this.state.ship_from}  class=" inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" required>
                  <option  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value="Barcelona, Spain">Barcelona, Spain</option>
                  <option  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value="New York, United States">New York, United States</option>
                </select>
              </div>
              <input placeholder= "Shipping To (City, Country)" type="text" id="ship_to" name="ship_to" value={this.state.ship_to} onChange={this.handleInputChange}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              <div style={{justifyContent: 'center', display: 'flex'}} class="checkbox-group required">
                <input
                  type="radio"
                  name="color"
                  onChange={this.handleInputChange}
                  value="red"
                />
                <input
                  type="radio"
                  name="color"
                  onChange={this.handleInputChange}
                  value="blue"
                />
                <input
                  type="radio"
                  name="color"
                  onChange={this.handleInputChange}
                  value="white"
                />
              </div>
              <button
              style={{width: '100%', fontSize: '20px'}}
                size="sm"
                variant="outline-success"
                type="submit"
                value="Login"
                class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Submit Order
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
