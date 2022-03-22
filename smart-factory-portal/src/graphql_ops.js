import gql from "graphql-tag";

export const GET_ORDERS = gql`
  query {
    orders {
      _id
      address
      color
      userId
      firstName
      lastName
      orderStatus
    }
  }
`;

