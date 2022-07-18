const model = require("./model");
module.exports = {
  Query: {
    Queryy: (_, {}) => {
      return model.sayHi;
    },
  },
  SayHi: {
    sayHi: (global) => {
      return "asd";
    },
  },
};
