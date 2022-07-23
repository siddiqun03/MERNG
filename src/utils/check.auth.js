const { verify } = require("jsonwebtoken");
const { SECRETKEY } = require("../../config");
const { AuthenticationError } = require("apollo-server");
module.exports = (context) => {
  // * context = { ...headers }
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ...
    const token = authHeader.split("Bearer ")[0];

    if (token) {
      try {
        const user = verify(token, SECRETKEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
