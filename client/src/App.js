import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import SearchYelp from './pages/SearchYelp';
import { Navbar, Nav } from 'react-bootstrap';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NavBar from './components/Navbar'
import InstallPWA from './install';
import { setContext } from '@apollo/client/link/context';
import './App.css';





// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar/>
        <div className="Nav">
       

        <Navbar.Brand>
        <InstallPWA />
        </Navbar.Brand>


        
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={<SearchYelp />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/me"
              element={<Profile />}
            />
          </Routes>
        </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
