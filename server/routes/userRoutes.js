import { getUser, getUserFriends, addRemoveFriend } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import express from "express";
const router= express.Router();

router.get("/:username", verifyToken, getUser);
router.get("/:username/friends", verifyToken, getUserFriends);
router.patch("/:username/:friendUsername", verifyToken, addRemoveFriend);

export default router;