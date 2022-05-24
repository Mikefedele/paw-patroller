import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BUSINESS = gql`
  mutation addBusiness($name: String!, $yelpId: String!, $url: String!, $location: String!) {
    addBusiness(name: $name, yelpId: $yelpId, url: $url, location: $location) {
      _id
      name
      yelpId
      url
      location
      comments {
        _id
        commentText
      }
    }
  }
`;

