import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js"
import { likePost, createPost, getFeedPosts, getUserPosts } from "../controllers/post";
const router= express.Router();

//Get Posts
router.get("/:username/posts", verifyToken,getUserPosts);
router.get("/", verifyToken, getFeedPosts);

//Like Posts
router.patch("/:postId/likes", verifyToken, likePost);

export default router;