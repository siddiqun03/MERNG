const { AuthenticationError } = require("apollo-server");

const Post = require("./model");
const checkAuth = require("../../utils/check.auth");

module.exports = {
  Query: {
    getPosts: async (_, {}) => {
      try {
        const posts = await Post.find().sort({ created_at: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found!");
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Post: {
    id: (global) => global.id,
    username: (global) => global.username,
    body: (global) => global.body,
    comments: (global) => global.comments,
    likes: (global) => global.likes,
    created_at: (global) => global.created_at,
    likeCount: (global) => global.likes.length,
    commentCount: (global) => global.comments.length,
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (user) {
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          created_at: new Date().toISOString(),
        });

        const post = await newPost.save();

        context.pubSub.publish("NEW_POST", {
          newPost: post,
        });

        return post;
      } else {
        throw new Error("Something is wrong!");
      }
    },
    async deletePost(_, { postId }, context) {
      try {
        const user = checkAuth(context);
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
