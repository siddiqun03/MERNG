const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const modules = require("./modules");
const mongoDB = require("../config");

const pubSub = new PubSub();

const server = new ApolloServer({
  modules,
  context: ({ req }) => ({ req, pubSub }),
});

mongoose
  .connect(mongoDB.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
