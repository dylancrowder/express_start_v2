import pino from "pino";

const isTestEnv = process.env.NODE_ENV === "test";
const isProdEnv = process.env.NODE_ENV === "production";

const logger = pino(
  isTestEnv
    ? { level: "silent" }
    : isProdEnv
    ? { level: "trace" } // producción sin pino-pretty
    : {
        level: "trace", // desarrollo
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
