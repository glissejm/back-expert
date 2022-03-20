import "dotenv/config";
import express from "express";
import { json, urlencoded } from "body-parser";

import authRouter from "./routes/auth.router";
import dashboardRouter from "./routes/dashboard.router";
import userRouter from "./routes/user.router";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//Cors configuration
const URL = ["http://localhost:3000"];
const corsOPtions = {
  origin: URL,
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


export default app
