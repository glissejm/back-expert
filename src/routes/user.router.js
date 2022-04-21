import express from "express";
//import controllers
import {
  verifyPassword,
  getInfoUser,
  updateUser,
  addQuestion,
} from "../controllers/user.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

router
  .route("/password")
  .post(authVerify, verifyPassword)
  .get(authVerify, getInfoUser)
  .put(authVerify, updateUser);

router.route("/addquestion").post(authVerify, addQuestion);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
