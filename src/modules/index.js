const test_module = require("./test");
const posts = require("./posts");
const user = require("./users");
const comment = require("./comments");
const likes = require("./like");
const subscriptions = require("./subscription");
module.exports = [test_module, posts, user, comment, likes, subscriptions];
