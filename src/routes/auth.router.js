import express from "express";

//import controllers
import { signUp, signIn, protect } from "../controllers/auth.controller";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/user").get(protect);
export default router;
