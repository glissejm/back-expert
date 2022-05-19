import "dotenv/config";
import express from "express";
import { json, urlencoded } from "body-parser";

import authRouter from "./routes/auth.router.js";
import dashboardRouter from "./routes/dashboard.router.js";
import userRouter from "./routes/user.router.js";
import paymentRouter from "./routes/payment.router.js";
import planRouter from "./routes/plan.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import fs from "fs-extra";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();

const corsOPtions = {
  origin: process.env.URL_FRONT,
  optionsSuccessStatus: 200,
  credentials: true,
};
//used

app.use(cors(corsOPtions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
//routes
//@signIn and signUp
app.use("/", authRouter);
app.use("/", dashboardRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", planRouter);

export default app
