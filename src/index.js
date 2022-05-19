import app from "./server.js";
import { connect } from "./utils/db.js";
import config from "./config/index.js";

const start = async () => {
  try {
    //conecta con la base de datos
    connect();
    //se escucha el servidor en el puerto
    app.listen(config.port, () => {
      console.log("Connect to database succesfully");
      console.log(`REST API on ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
