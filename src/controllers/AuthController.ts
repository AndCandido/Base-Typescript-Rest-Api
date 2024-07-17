import { NextFunction, Request, Response } from "express";

import { UserRequestDto } from "../models/user";
import { inject, injectable } from "inversify";
import { IocTypes } from "../types";
import { IAuthService, RequestWithLoginData } from "../interfaces";
import { BaseError } from "../core/errors";
import { messageErrors } from "../core/messageErrors";

@injectable()
export class AuthController {
  constructor(@inject(IocTypes.AuthService) private authService: IAuthService) {}

  login = async (req: RequestWithLoginData, res: Response, next: NextFunction) => {
    if (!req.loginData) {
      const error = new BaseError([messageErrors.REQUEST.CREDENTIALS_ERROR]);
      next(error);
    }

    try {
      const user = await this.authService.login(req.loginData!);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    const userBody = req.body as UserRequestDto;

    try {
      const userCreated = await this.authService.register(userBody);
      res.status(201).send(userCreated);
    } catch (err) {
      next(err);
    }
  };
}
