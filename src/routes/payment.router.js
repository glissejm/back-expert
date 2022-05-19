import express from "express";
//import controllers
import { processPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/process-payment").post(processPayment);
export default router;