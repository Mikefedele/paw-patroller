import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SearchYelp from './pages/SearchYelp';
import { Navbar, Nav } from 'react-bootstrap';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NavBar from './components/Navbar'
import './App.css';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar/>
        <div className="Nav">
       

        <Navbar.Brand>

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
            <Route
              path="/profiles/:username"
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
