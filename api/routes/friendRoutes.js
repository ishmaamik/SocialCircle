import {getFriends, addFriend} from "../controllers/friendController.js"
import express from "express"

const router= express.Router()

router.post('/addFriend', addFriend)
router.get('/:username', getFriends)

export default router