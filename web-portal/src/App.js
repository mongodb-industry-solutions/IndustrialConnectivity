import logo from "./media/logo.png";
import React, { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { ContentView } from "./ContentView";
import { StatusBar } from "./StatusBar";
import { OrderForm } from "./OrderForm";
//Tab Style 
import styled from 'styled-components';


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

//Tab Style
const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Customer Order Form', 'Factory Order Logs'];



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
  const [location, setLocation] = React.useState('');
  const [active, setActive] = useState(types[0]);



  useEffect(() => {
    var endpoint = 'http://ip-api.com/json/?fields=status,message,country,city';
    var xhr = new XMLHttpRequest();
    var address = ""
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if(response.status !== 'success') {
          console.log('query failed: ' + response.message);
          return
        }
        address = response.city + ", " + response.country
        setLocation(address) 
      }
    };
    xhr.open('GET', endpoint, true);
    xhr.send();
  });

  // Conditional Rendering ->> https://reactjs.org/docs/conditional-rendering.html




  return (
          <div className="App min-h-screen bg-gray-100 text-gray-900">
          <header className="App-header">
            <div class="container mx-auto">
                  <div md="auto">
                    <div style={{display:'inline', alignItems: 'center', justifyContent: 'center',}}>
                    <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                      <img src={logo} style={{}} width="500" height="500" alt="MongoDB Logo"/>
                      </div>
                      <h1 style={{fontSize : '35px', textAlign: 'center'}}>Connected Factory</h1>
                                <ButtonGroup>
                                    {types.map(type => (
                                      <Tab
                                        key={type}
                                        active={active === type}
                                        onClick={() => setActive(type)}
                                      >
                                        {type}
                                      </Tab>
                                    ))}
                                </ButtonGroup>
                    </div>
                  </div>
              </div>
          </header>
        
        <p />
              <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div class="container mx-auto">
                {user ? (
                  <ApolloProvider client={client}>

                    {active == "Customer Order Form"?( <OrderForm app={app} location={location} user={user} />):(<ContentView />) }
                   
                  </ApolloProvider>
                ) : (
                  <LoginForm app={app} setUser={setUser} />
                )}
                {user ? <StatusBar app={app} setUser={setUser} /> : <div />}
                </div>
            </main>
        </div>
  );

  

//Original code before tabs

/*
  return (
    <div className="App min-h-screen bg-gray-100 text-gray-900">
      <header className="App-header">
      <div class="container mx-auto">
            <div md="auto">
              <div style={{display:'inline', alignItems: 'center', justifyContent: 'center',}}>
              <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <img src={logo} style={{}} width="500" height="500" alt="MongoDB Logo"/>
                </div>
                <h1 style={{fontSize : '35px', textAlign: 'center'}}>Connected Factory</h1>
              </div>
            </div>
        </div>
      </header>
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div class="container mx-auto">
          {user ? (
            <ApolloProvider client={client}>


                  <OrderForm app={app} location={location} user={user} />
                  <ContentView />
            </ApolloProvider>
          ) : (
            <LoginForm app={app} setUser={setUser} />
          )}
          {user ? <StatusBar app={app} setUser={setUser} /> : <div />}
          </div>
      </main>
    </div>
  );

  */

// End of Original code before Tabs

}

export default App;
