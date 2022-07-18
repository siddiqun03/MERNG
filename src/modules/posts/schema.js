const { gql } = require("apollo-server");

module.exports = gql`
  type Posts {
    id: ID!
    body: String!
    created_at: String!
    user_name: String!
  }

  extend type Query {
    getPosts: [Posts]
  }
`;
