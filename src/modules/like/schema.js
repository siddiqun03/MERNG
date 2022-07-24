const { gql } = require("apollo-server");
module.exports = gql`
  extend type Mutation {
    likePost(postId: ID!): Post!
  }
`;
