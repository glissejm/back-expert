import app  from "./server";
import { connect } from "./utils/db";
import config from "./config";

const start = async () => {
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

start();


