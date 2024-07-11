import { NextFunction, Response } from "express";
import { BaseError } from "../../core/errors";
import { RequestWithLoginData } from "../../interfaces";
import { messageErrors } from "../../core/messageErrors";

export function recoverLoginDataFromHeaders(
  req: RequestWithLoginData,
  res: Response,
  next: NextFunction,
) {
  const authEncoded = req.headers.authorization!.replace("Basic ", "");
  const [username, password] = Buffer.from(authEncoded, "base64")
    .toString()
    .split(":");

  if (!username || !password) {
    const error = new BaseError([messageErrors.REQUEST.CREDENTIALS_MISSING]);
    next(error);
  }

  req.loginData = {
    username,
    password,
  };

  next();
}
