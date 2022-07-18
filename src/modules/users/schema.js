const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    user_name: String!
    created_at: String!
  }

  input RegisterInput {
    user_name: String!
    password: String!
    confirm_password: String!
    email: String!
  }
  type mutation {
    register(registerInput: RegisterInput): User!
  }
`;
