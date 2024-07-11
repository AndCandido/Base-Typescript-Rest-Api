import { NextFunction, Request, Response } from "express";
import { ContextRunner } from "express-validator";
import { BaseError } from "./errors";

export const validationBodyHandler = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errorsMessages: string[] = [];

    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const errors = result.array().map((ve) => ve.msg);
        errorsMessages.push(...errors);
      }
    }

    if (errorsMessages.length >= 1) {
      const error = new BaseError(errorsMessages);
      next(error);
    }

    next();
  };
};
