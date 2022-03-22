import React from "react";

// Bootstrap
import Table from 'react-bootstrap/Table';

// Apollo
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "./graphql_ops";


export function ContentView() {
  return (
    <div>
      <OrdersView />
    </div>
  );
}

function OrdersView() {
  const { loading, error, data } = useQuery(GET_ORDERS, {
    //variables: { query: { title: searchText } }
  });

  if (loading) {
    console.log("loading");
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(data);
    console.log("Error: " + error);
    return <p>Error :(</p>;
  }
  console.log(data);
  
  return ((
        <Table>
          <thead>
            <tr>
              <th>Color</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map(({ _id, color, address, firstName, lastName, orderStatus}) => (
              <tr key={_id}>
                <td>{color}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{address}</td>
                <td>{orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  ));
}
