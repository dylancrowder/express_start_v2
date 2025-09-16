import pino from "pino";

const isTestEnv = process.env.NODE_ENV === "test";
const isProdEnv = process.env.NODE_ENV === "production";

const logger = pino(
  isTestEnv
    ? { level: "silent" }
    : isProdEnv
    ? { level: "info" } // producción: JSON puro y nivel adecuado
    : {
        level: "trace", // desarrollo local
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
);

export default logger;
