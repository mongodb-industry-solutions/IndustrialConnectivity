import React from "react";

import Table from "./Components/Table";
// Apollo
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "./graphql_ops";

import { StatusPill } from "./Components/Table";
import { AvatarCell } from "./Components/Table";
import { DateField } from "./Components/Table";
import { TimeField } from "./Components/Table";


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
  const columns = [
    {
      Header: "Headshot",
      accessor: "",
      id: "headshot",
      Cell: AvatarCell,
    },
    {
      Header: "First Name",
      accessor: "firstName",
      id: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      id: "lastName",
    },
    {
      Header: "Color",
      accessor: "color",
      id: "color",
      Cell: StatusPill, // new
    },
    {
      Header: "Ship From",
      accessor: "ship_from",
      id: "ship_from",
    },
    {
      Header: "Ship To",
      accessor: "ship_to",
      id: "ship_to",
    },
    {
      Header: "Status",
      accessor: "orderStatus",
      id: "orderStatus",
      Cell: StatusPill, // new
    },
    {
      Header: "Date",
      accessor: "timeStamp",
      id: "date",
      Cell: DateField, // new
    },
    {
      Header: "Time",
      accessor: "timeStamp",
      id: "time",
      Cell: TimeField, // new
    },
  ]
  
  return ((
        <div className="min-h-full bg-gray-100 text-gray-900">
          <div className="">
            <h1 className=" font-semibold text-center mt-15 text-3xl mt-8">Orders Logs 📄</h1>
          </div>
          <div className="mt-5">
            <Table columns={columns} data={data.neworders} />
          </div>
      </div>
  ));
}
