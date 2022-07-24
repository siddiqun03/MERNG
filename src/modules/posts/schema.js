const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    comments: [Comments]!
    likes: [Likes]!
    likeCount: Int!
    commentCount: Int!
    created_at: String!
  }

  type Comments {
    id: ID!
    created_at: String!
    username: String!
    body: String!
  }

  type Likes {
    id: ID!
    created_at: String!
    username: String!
  }

  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
