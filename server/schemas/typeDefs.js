const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    businesses: [Business]
    comments: [Comment]
  }
  type Business {
    _id: ID
    name: String
    yelpId: String
    url: String
    location: String
    imgUrl: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
    businesses(username: String): [Business]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBusiness(name: String!, yelpId: String!, url: String!, location: String!, imgUrl: String): Business
    removeBusiness(businessId: ID!): Business
    addComment(businessId: ID!, commentText: String!): Business
    removeComment(businessId: ID!, commentId: ID!): Business
  }
`;

module.exports = typeDefs;

