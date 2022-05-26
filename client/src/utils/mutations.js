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
  mutation addBusiness($name: String!, $yelpId: String!, $url: String!, $location: String!, $imgUrl: String) {
    addBusiness(name: $name, yelpId: $yelpId, url: $url, location: $location, imgUrl: $imgUrl) {
      _id
      name
      yelpId
      url
      location
      imgUrl
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation addComment($businessId: ID!, $commentText: String!) {
  addComment(businessId: $businessId, commentText: $commentText) {
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
}`;

export const REMOVE_BUSINESS = gql`
mutation removeBusiness($businessId: ID!) {
  removeBusiness(businessId: $businessId) {
    _id
    name
    yelpId
    url
    location
    imgUrl
    comments {
      _id
      commentText
    }
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation removeComment($businessId: ID!, $commentId: ID!) {
  removeComment(businessId: $businessId, commentId: $commentId) {
    _id
    name
    yelpId
    url
    location
    comments {
      _id
      commentAuthor
    }
  }
}`;

