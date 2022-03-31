import express from "express";
//import controllers
import {
  verifyPassword,
  getInfoUser,
  updateUser,
} from "../controllers/user.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

router
  .route("/password")
  .post(authVerify, verifyPassword)
  .get(authVerify, getInfoUser)
  .put(authVerify, updateUser);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
