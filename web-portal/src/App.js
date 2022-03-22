import logo from "./logo.svg";
import React from "react";
import { LoginForm } from "./LoginForm";
import { ContentView } from "./ContentView";
import { StatusBar } from "./StatusBar";
import { OrderForm } from "./OrderForm";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Row, Col } from "react-bootstrap";

// Custom CSS
import "./App.css";

// Realm
import { graphQLEnpoint, realmAppID } from "./RealmAppConfig";
import * as Realm from "realm-web";

// Apollo
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

// Connect to your MongoDB Realm app
const app = new Realm.App(realmAppID);

// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
  link: new HttpLink({
    uri: graphQLEnpoint,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.

    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    console.log("Error: No CurrentUser!");
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}

function App(props) {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  // Conditional Rendering ->> https://reactjs.org/docs/conditional-rendering.html

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row className="align-items-center">
            <Col xs={3}>
              <img
                src={logo}
                width="100"
                height="100"
                className="d-inline-block align-top"
                alt="MongoDB Logo"
              />
            </Col>
            <Col md="auto">
              <div>
                <h1>MongoDB Connected Factory</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <main>
        <Container>
          {user ? (
            <ApolloProvider client={client}>
              <Tabs
                fill
                defaultActiveKey="orders"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="orders" title="Orders">
                  <ContentView />
                </Tab>
                <Tab eventKey="form" title="Order Form">
                  <OrderForm app={app} />
                </Tab>
              </Tabs>
            </ApolloProvider>
          ) : (
            <LoginForm app={app} setUser={setUser} />
          )}
          {user ? <StatusBar app={app} setUser={setUser} /> : <div />}
        </Container>
      </main>
    </div>
  );
}

export default App;
