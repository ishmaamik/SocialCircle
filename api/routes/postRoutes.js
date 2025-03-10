import express from "express"
import { addPost, getUserPosts, getFriendsPosts } from "../controllers/postController"

const router= express.Router()

router.post('/addPost', addPost )
router.get('/posts/:username', getUserPosts)
router.get('/posts', getFriendsPosts)