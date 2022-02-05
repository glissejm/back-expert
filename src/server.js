import express from "express";
import { json, urlencoded } from "body-parser";
import config from "./config";

const app = express();

//used
app.use(json());

//routes

//message when server start
export const start = async () => {
  try {
    //conecta con la base de datos

    //se escucha el servidor en el puerto 3000
    app.listen(config.port, () => {
      console.log("REST API on 3000");
    });
  } catch (e) {
    console.error(e);
  }
};
