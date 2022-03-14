import express from "express";

//import controllers
import {
  signUp,
  signIn,
  loginGoogle,
  registerGoogle,
} from "../controllers/auth.controller";
import { firstVerify } from "../utils/middlewares/verifyToken";
//import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/logingoogle").post(loginGoogle);
router.route("/registergoogle").post(registerGoogle);
router.route("/verify").get(firstVerify);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
