import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSearchUser,
  getSuggestedUsers,
  getUserFollowers,
  getUserFollowing,
} from "../controllers/user.controller.js";

import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/search/:name", protectRoute, getSearchUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.get("/tunning/:username", protectRoute, getUserFollowers);
router.get("/listening/:username", protectRoute, getUserFollowing);
router.put("/update/:id", protectRoute, updateUser);

export default router;