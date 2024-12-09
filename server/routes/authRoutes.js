import { login, register } from "../controllers/auth.js";
import { upload } from "../middlewares/multer.js";
import express from "express";

const router= express.Router();

router.post("/login", login); //no verifyToken as register and login is first step
router.post("/register", upload.single('profileImage') ,register);

export default router;