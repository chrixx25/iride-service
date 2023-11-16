/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

type DecodeResBody = {
  decoded?: string | JwtPayload;
};

const checkToken = (
  req: Request & DecodeResBody,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get("Authorization");
  if (token) {
    verify(token.slice(7), process.env.TOKEN_NAME, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid Token.",
        });
      }
      req.decoded = decoded;
      next();
    });
    return false;
  }
  return res.status(403).json({
    message: "Access denied! Unauthorized user.",
  });
};

export default checkToken;
