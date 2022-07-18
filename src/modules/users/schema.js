const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
  }

  input RegisterInput {
    user_name: String!
    password: String!
    confirm_password: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
