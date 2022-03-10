import "dotenv/config";
import express from "express";
import { json, urlencoded } from "body-parser";
import config from "./config";
import { connect } from "./utils/db";
import authRouter from "./routes/auth.router";
import dashboardRouter from "./routes/dashboard.router";
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

//message when server start
export const start = async () => {
  try {
    //conecta con la base de datos
    connect();
    //se escucha el servidor en el puerto 3000
    app.listen(config.port, () => {
      console.log("Connect to database succesfully");
      console.log(`REST API on ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
