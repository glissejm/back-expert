import express from "express";
//import controllers
import { getQuestions, getQuestion } from "../controllers/question.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();

//get questions default
router.route("/dashboard").get(authVerify, getQuestions);
router.route("/dashboard").post(authVerify, getQuestions);

router.route("/dashboard/:q_id").get( getQuestion);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
