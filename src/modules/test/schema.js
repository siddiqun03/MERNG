const { gql } = require("apollo-server");

module.exports = gql`
  type SayHi {
    sayHi: String
  }

  extend type Query {
    Queryy: SayHi!
  }
`;
