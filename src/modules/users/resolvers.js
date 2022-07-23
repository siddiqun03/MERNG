const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  loginValidate,
} = require("../../utils/validators");
const { SECRETKEY } = require("../../../config");
const User = require("./model");

const generateToken = (data) => {
  return sign(
    {
      id: data._id,
      email: data.email,
      username: data.username,
    },
    SECRETKEY,
    { expiresIn: "24h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = loginValidate(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const mutch = await compare(password, user.password);
      if (!mutch) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirm_password } }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirm_password
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      password = await hash(password, 12);
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const newUser = new User({
        email,
        username: username,
        password,
        created_at: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
