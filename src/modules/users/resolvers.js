const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { SECRETKEY } = require("../../../config");
const user = require("./model");

module.exports = {
  mutation: {
    async register(
      _,
      { registerInput: { user_name, email, password, confirm_password } },
      context,
      info
    ) {
      password = await hash(password, 12);

      const newUser = new user({
        email,
        user_name,
        password,
        created_at: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = sign(
        {
          id: res.id,
          email: res.email,
          user_name: res.user_name,
        },
        SECRETKEY,
        { expiresIn: "24h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
