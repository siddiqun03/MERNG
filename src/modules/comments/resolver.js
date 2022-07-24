const checkAuth = require("../../utils/check.auth");
const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../posts/model");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { body: "Comment body must not empty" },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username: username,
          created_at: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((e) => e.id === commentId);
        if (commentIndex < 0) throw new UserInputError("Comment not found");
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Post not found");
    },
  },
};
