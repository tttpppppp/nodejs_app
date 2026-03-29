import winston from "winston";

const transports: winston.transport[] = [];

if (process.env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/combined.log" })
  );
} else {
  transports.push(new winston.transports.Console());
}
const Logger: winston.Logger = winston.createLogger({
  transports: transports,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
});
export default Logger;
