import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    (req.path == "/user/create" || req.path.startsWith("/api-docs"),
    req.path.startsWith("/auth") && req.method === "POST")
  ) {
    return next();
  }
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as {
      id: string;
    };
    if (!(req as any).user) {
      (req as any).user = { id: user.id };
    } else {
      (req as any).user.id = user.id;
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
