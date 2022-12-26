const PostModel = require("../Models/Post");
const UserModel = require("../Models/User");

//create a post
const CreatePost = async (req, res) => {
  const { userId = req.user, ...others } = req.body;
  const newPost = new PostModel({ ...others, userId });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update a post
const UpdatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.user) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a post
const DeletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.user) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//like / dislike a post

const PostReaction = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post.likes.includes(req.user)) {
      await post.updateOne({ $push: { likes: req.user } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get a post
const GetPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts
const GetTimlinePosts = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.user);
    const userPosts = await PostModel.find({userId:currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return PostModel.find({userId:friendId});
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

//get user's all posts
const UserPosts = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    const posts = await PostModel.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {CreatePost,UpdatePost,DeletePost,PostReaction,GetPost,GetTimlinePosts,UserPosts};
