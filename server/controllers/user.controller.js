import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../configurations/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in Signing Up User: ", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || "",
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid Username or Password" });

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Logging In User: ", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in Loggin Out User: ", err.message);
  }
};

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    let user;
    const isValidObjectId =
      mongoose.Types.ObjectId.isValid(username) &&
      /^[a-fA-F0-9]{24}$/.test(username);

    if (isValidObjectId) {
      user = await User.findOne({ _id: username })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: username })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User Not Found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in Getting User's Profile: ", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User Not Found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You Cannot Update Other User's Profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0],
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] },
    );

    user.password = null;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in Updating User: ", err.message);
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByYou = await User.findById(userId).select("following");
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id),
    );
    const suggestedUsers = filteredUsers.slice(0, 6);

    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Getting Suggested Users: ", err.message);
  }
};

const getSearchUser = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await User.find({
      name: { $regex: new RegExp(`^${name}`, "i") },
    })
      .select("-password")
      .select("-updatedAt");
    res.json(users);
  } catch (error) {
    console.error("Error in Searching Users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const following = await User.find({ _id: { $in: user.followers } })
      .select("-password")
      .select("-updatedAt");

    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in Fetching Followers of Users:", error);
  }
};

const getUserFollowing = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = await User.find({ _id: { $in: user.following } })
      .select("-password")
      .select("-updatedAt");

    res.status(200).json(following);
  } catch (error) {
    console.error("Error in Fetching Following of User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You Cannot Follow/Unfollow Yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User Not Found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User Unfollowed Successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User Followed Successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in Following/Unfollowing : ", err.message);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  getSuggestedUsers,
  getSearchUser,
  getUserFollowers,
  getUserFollowing,
};