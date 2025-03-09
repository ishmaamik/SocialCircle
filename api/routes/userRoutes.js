import {getUser, addUser, setUsername} from "../controllers/userController.js"
import express from "express"

const router= express.Router()

router.post('/', addUser)
router.get('/:username', getUser)
router.post('/:email', setUsername)

export default router
