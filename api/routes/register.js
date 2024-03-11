import express from "express";
import { register } from "../controller/auth/register.js";
import { verifyToken } from "../middleware/verifyToken.js";
// import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post("/", register);
router.get("/verify/:token", verifyToken)
export default router;
