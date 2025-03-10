import express from "express"
import { addPost, getUserPosts, getFriendsPosts } from "../controllers/postController.js"

const router= express.Router()

router.post('/addPost', addPost )
router.get('/posts/:firstName', getUserPosts)
router.get('/posts', getFriendsPosts)

export default router