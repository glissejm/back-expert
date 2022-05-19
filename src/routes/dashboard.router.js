import express from "express";
//import controllers
import {
  getQuestions,
  getQuestion,
  getProgress,
  getIdProgress,
} from "../controllers/question.controller.js";
import { authVerify } from "../utils/middlewares/verifyToken.js";
const router = express.Router();

//get questions default
router.route("/dashboard").get(authVerify, getQuestions);

router.route("/dashboard/:q_id").get(authVerify, getQuestion);

router.route("/progress").get(authVerify, getProgress);

router.route("/idprogress").get(authVerify, getIdProgress);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
