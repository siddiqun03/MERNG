const { gql } = require("apollo-server");

module.exports = gql`
  type Subscription {
    newPost: Post!
  }
`;
