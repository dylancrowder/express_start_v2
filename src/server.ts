import app from "./app";
import dotenv from "dotenv";
import logger from "./utilities/pino.logger";
import { initMongo } from "./db/db_connect";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.APP_PORT || 8085;
initMongo();

app.listen(PORT, () => {
  logger.info(
    `Servidor corriendo en el puerto: ${PORT} ${process.env.NODE_ENV}`
  );
});

process.on("uncaughtException", (err) => {
  logger.error({ err }, "Excepción no controlada");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Promesa no manejadas");
  process.exit(1);
});
