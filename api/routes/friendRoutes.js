import {getFriends, addFriend, getSuggestions} from "../controllers/friendController.js"
import express from "express"

const router= express.Router()

router.post('/addFriend', addFriend)
router.get('/:firstName', getFriends)
router.get('/suggest/:firstName', getSuggestions)

export default router