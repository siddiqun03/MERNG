const { gql } = require("apollo-server");

module.exports = gql`
  extend type Mutation {
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;
