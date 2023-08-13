import { NextFunction, Request, Response } from "express";

export const ValidateSchema = (schema: Zod.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }

    next();
  };
};
