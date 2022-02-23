import express from "express";

//import controllers
import { signUp, signIn, protect } from "../controllers/auth.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
//routers protected
router.route("/user").get(authVerify, protect);
export default router;
