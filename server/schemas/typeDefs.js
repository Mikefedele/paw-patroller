const { gql } = require("apollo-server-express");

//todo unique & match
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input savedBook {
  bookId: String!
  authors: [String]
  description: String!
  image: String
  link: String
  }
# Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
  type Query { me: User }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    saveBook(bookData: savedBook): User

    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
