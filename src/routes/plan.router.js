import express from "express";
//import controllers
import { getPlans } from "../controllers/plan.controller";

const router = express.Router();

router.route("/pay/plans").get(getPlans);
export default router;