const post = require("./model");

module.exports = {
  Query: {
    getPosts: async (_, {}) => {
      try {
        const posts = await post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Posts: {
    id: (global) => global.id,
    body: (global) => global.body,
    created_at: (global) => global.createdAt,
    comments: (global) => global.comments,
    likes: (global) => global.likes,
    user_name: (global) => global.username,
  },
};
