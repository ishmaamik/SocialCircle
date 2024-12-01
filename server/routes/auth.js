import { login, register } from "../controllers/auth.js";
import { upload } from "../middlewares/multer.js";
import express from "express";

const router= express.Router();

router.post("/login", login);
router.post("/register", upload.single('profileImage') ,register);

export default router;