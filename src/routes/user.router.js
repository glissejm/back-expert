import express from "express";
//import controllers
import {
  getUser,
  updateUser,
  deleteUser,
  getUserEmail,
} from "../controllers/user.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

//get questions default

router
  .route("/user/:user_id")
  .get(authVerify, getUser)
  .put(authVerify, updateUser)
  .delete(authVerify, deleteUser);

router.route("/email/:email").get(authVerify, getUserEmail);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
