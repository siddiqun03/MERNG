const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    created_at: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirm_password: String!
    email: String!
  }

  extend type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
