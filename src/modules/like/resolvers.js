const checkAuth = require("../../utils/check.auth");
const Post = require("../posts/model");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      console.log(username);
      const post = await Post.findById(postId);
      console.log(post);
      if (post) {
        if (post?.likes?.find((like) => like?.username === username)) {
          // Post alredy likes, unlike it...
          post.likes = post.likes?.filter(
            (like) => like?.username !== username
          );
        } else {
          // Not liked, like post
          post?.likes.push({
            username,
            created_at: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
