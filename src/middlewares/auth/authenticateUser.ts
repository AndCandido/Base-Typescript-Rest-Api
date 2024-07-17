import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../core/errors";
import { inject, injectable } from "inversify";
import { IocTypes } from "../../types";
import { ITokenService, IUserService } from "../../interfaces";

@injectable()
export default class AppAuthorization {
  constructor(
    @inject(IocTypes.TokenService) private tokenService: ITokenService,
    @inject(IocTypes.UserService) private userService: IUserService,
  ) {}

  authenticateUserToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization!.replace("Bearer ", "");

    try {
      await this.authenticateToken(token);
      return next();
    } catch (e) {
      const error = new BaseError(["invalid token"], "Unauthorized", 401);
      return next(error);
    }
  };

  authenticateToken = async (token: string) => {
    const tokenData = this.tokenService.validateToken(token);
    const username = tokenData.payload.sub as string;
    await this.userService.getUserByUsername(username);
  };
}
