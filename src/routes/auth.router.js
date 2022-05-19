import express from "express";

//import controllers
import {
  signUp,
  signIn,
  loginGoogle,
  registerGoogle,
  logout,
  recoveryPasswordController,
  resetPassword,
} from "../controllers/auth.controller.js";
import { firstVerify, authVerify } from "../utils/middlewares/verifyToken.js";
import {auth} from "../utils/middlewares/auth.js"
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/logingoogle").post(loginGoogle);
router.route("/registergoogle").post(registerGoogle);
router.route("/verify").get(firstVerify);
router.route("/logout").get(authVerify, logout);
router.route("/users/recovery-password").post(recoveryPasswordController);
router.route("/users/reset-password").put(auth,resetPassword)
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
