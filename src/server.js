import "dotenv/config";
import express from "express";
import { json, urlencoded } from "body-parser";
import config from "./config";
import { connect } from "./utils/db";
import authRouter from "./routes/auth.router";

const app = express();

//used
app.use(json());
app.use(urlencoded({ extended: true }));

//routes
//@signIn and signUp
app.use("/", authRouter);

//message when server start
export const start = async () => {
  try {
    //conecta con la base de datos
    await connect();
    //se escucha el servidor en el puerto 3000
    app.listen(config.port, () => {
      console.log("Connect to database succesfully");
      console.log("REST API on 3000");
    });
  } catch (e) {
    console.error(e);
  }
};
