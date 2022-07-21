import gql from "graphql-tag";

export const GET_ORDERS = gql`
  query {
    neworders {
      _id
      ship_from
      ship_to
      color
      userId
      firstName
      lastName
      orderStatus
      timeStamp
    }
  }
`;

