import express from "express";

//import controllers
import { signUp, signIn } from "../controllers/auth.controller";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);

export default router;
