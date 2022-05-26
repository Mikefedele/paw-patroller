import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      businesses {
        _id
        name
        location
        imgUrl
        yelpId
        url
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      business {
        _id
        name
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_BUSINESSES = gql`
  query Businesses {
    businesses {
      _id
      name
      location
      url
    }
  }
`;