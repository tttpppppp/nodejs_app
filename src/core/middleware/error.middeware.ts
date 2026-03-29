import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils";
import { HttpException } from "../exception";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal Server Error" });
  Logger.error(`Error: ${error.message}`);
};

export default errorMiddleware;
