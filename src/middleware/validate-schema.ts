/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response, NextFunction } from "express";
import { map } from "lodash";
import { z } from "zod";

const validate =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      const zorError = error as z.ZodError;
      return res.status(400).json(
        map(zorError.issues, ({ path, message }) => ({
          field: path[1],
          message,
        })),
      );
    }
  };

export default validate;
