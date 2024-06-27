/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { BaseError, InternalServerError } from "../core/errors";

export function globalErrorsHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errorNormalized = normalizeError(err);
  const statusCode = errorNormalized.statusCode;
  const body = errorNormalized.getBody();

  res.status(statusCode).json(body);
}

function normalizeError(err: Error): BaseError {
  if (err instanceof BaseError) return err;

  return new InternalServerError(err);
}
