import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.SECRET!) as any;
    (req as any).userId = data.userId;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Token invalido" });
  }
}
