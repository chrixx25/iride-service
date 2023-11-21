import type { Decoded } from "../types/user.types";

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const checkToken = (
  req: Request & Decoded,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get("Authorization");
  if (token) {
    verify(token.slice(7), process.env.TOKEN_NAME as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid Token.",
        });
      }
      req.decoded = decoded as Decoded["decoded"];
      next();
    });
    return false;
  }
  return res.status(403).json({
    message: "Access denied! Unauthorized user.",
  });
};

export default checkToken;
