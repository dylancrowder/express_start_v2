import app from "./app";
import dotenv from "dotenv";
import logger from "./utilities/pino.logger";
import { initMongo } from "./db/db_connect";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await initMongo(); // ✅ Espera a que Mongo se conecte

    app.listen(PORT, () => {
      logger.info(
        `Servidor corriendo en el puerto: ${PORT} ${process.env.NODE_ENV}`
      );
    });
  } catch (error) {
    logger.error({ error }, "Error iniciando el servidor");
    process.exit(1);
  }
};

// Manejo global de errores
process.on("uncaughtException", (err) => {
  logger.error({ err }, "Excepción no controlada");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Promesa no manejadas");
  process.exit(1);
});

startServer();
