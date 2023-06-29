import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { key } from "../private";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTION") {
    next();
  }
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: "не авторизован" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "пользователь не авторизован" });
  }
}
