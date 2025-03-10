import express from "express";
import { getComments, createComment } from "../controllers/commentController.js";

const router = express.Router();

// Route for getting comments for a post
router.get("/:postId", getComments);

// Route for adding a comment or reply
router.post("/add", createComment);

export default router;
