import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../core/errors";
import { inject, injectable } from "inversify";
import { IocTypes } from "../../types";
import { ITokenService, IUserService } from "../../interfaces";
import { Jwt } from "jsonwebtoken";

@injectable()
export default class AppAuthorization {
  constructor(
    @inject(IocTypes.TokenService) private tokenService: ITokenService,
    @inject(IocTypes.UserService) private userService: IUserService,
  ) {}

  authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      const error = new BaseError(
        ["authorization is required"],
        "Unauthorized",
        401,
      );
      next(error);
      return;
    }

    const token = authorization!.replace("Bearer ", "");
    let tokenData!: Jwt;

    try {
      tokenData = this.tokenService.validateToken(token);
    } catch (e) {
      const error = new BaseError(["invalid token"], "Unauthorized", 401);
      next(error);
      return;
    }

    const username = tokenData.payload.sub as string;

    if (!username) {
      const error = new BaseError(
        ["invalid token username"],
        "Unauthorized",
        401,
      );
      next(error);
      return;
    }

    try {
      await this.userService.getUserByUsername(username);
      next();
      return;
    } catch (e) {
      const error = new BaseError(
        ["token user not found"],
        "Unauthorized",
        401,
      );
      next(error);
      return;
    }
  };
}
