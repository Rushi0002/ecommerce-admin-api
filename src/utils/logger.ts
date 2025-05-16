import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const logger = pino(
  isDev
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {
        // Raw JSON logs for production (no transport means default output)
        level: "info", // set desired log level
      }
);

export default logger;
