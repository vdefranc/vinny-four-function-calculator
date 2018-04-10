import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import styled from 'styled-components';

import App from './App';


const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

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
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Header>Vinny's Cool Calculator</Header>

    <App />
  </ApolloProvider>
  , document.getElementById('root')
);

registerServiceWorker();
