import express from "express";

//import controllers
import { signUp, signIn } from "../controllers/auth.controller";
//import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
