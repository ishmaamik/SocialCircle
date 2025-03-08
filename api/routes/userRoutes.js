import {getUser, addUser} from "../controllers/userController.js"
import express from "express"

const router= express.Router()

router.post('/', addUser)
router.get('/:username', getUser)

export default router
