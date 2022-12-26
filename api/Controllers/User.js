const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");

//update user
const UpdateUser = async (req, res) => {
  if (req.user === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

const DeleteUser = async (req, res) => {
  if (req.user === req.params.id) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

//get a user
const GetUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  var followed = null;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    if (other.followers.includes(req.user)) {
      followed = true;
    } else {
      followed = false;
    }
    console.log({ ...other, followed });
    res.status(200).json({ ...other, followed });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//get friends
const GetFriends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

//follow a user
const FollowUser = async (req, res) => {
  if (req.user !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user);
      if (!user.followers.includes(req.user)) {
        await user.updateOne({ $push: { followers: req.user } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

//unfollow a user
const UnfollowUser = async (req, res) => {
  if (req.user !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user);
      if (user.followers.includes(req.user)) {
        await user.updateOne({ $pull: { followers: req.user } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

const SearchUsers = async (req,res) => {
  const search = req.query.username;
    try {
      const user=await UserModel.find({username:search});
      res.status(200).json(user);     
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
};

module.exports = {
  UpdateUser,
  DeleteUser,
  GetUser,
  GetFriends,
  FollowUser,
  UnfollowUser,
  SearchUsers
};
