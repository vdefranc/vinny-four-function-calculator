import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import App from './App';

import styled from 'styled-components';

const uri = process.env.NODE_ENV === 'production' ?
  'https://aqueous-mesa-53497.herokuapp.com/' :
  'http://localhost:4000';

const httpLink = new HttpLink({
  uri: 'https://aqueous-mesa-53497.herokuapp.com/'
});

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     // connectionParams: {
//     //   authToken: localStorage.getItem(AUTH_TOKEN),
//     // }
//   }
// });

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLink,
// );

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const Header = styled.h1`
  position: relative;
  margin: 0;
  font-family: "Titillium Web", sans-serif;
  font-size: 200px;
  font-style: italic;
  line-height: 1;
  font-size: 4em;
  background-image: linear-gradient(#378dbc 0%, #b6e8f1 46%, #fff 50%, #32120e 54%, #ffc488 58%, #582c11 90%, #ec9b4e 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #f975f7;
  filter: drop-shadow(1px 1px 3px #f008b7);
  margin-bottom: 0.5em;
  text-align: center;
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Header>Vinny's Cool Calculator</Header>

    <App />
  </ApolloProvider>
  , document.getElementById('root')
);

registerServiceWorker();
