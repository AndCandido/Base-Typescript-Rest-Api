import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import validateUserRequestDto from "../middlewares/validations/validateUserRequestDto";
import { IocTypes } from "../types";
import validateAuthorizationHeader from "../middlewares/validations/validateAuthorizationHeader";
import { recoverLoginDataFromHeaders } from "../middlewares/auth/recoverLoginDataFromHeaders";
import AppAuthorization from "../middlewares/auth/authenticateUser";
import { inject, injectable } from "inversify";
import { IAppRouter } from "../interfaces";

@injectable()
class AuthRouter implements IAppRouter {
  private userRouter = Router();
  constructor(
    @inject(IocTypes.AuthController) private authController: AuthController,
    @inject(IocTypes.AppAuthorization)
    private appAuthentication: AppAuthorization,
  ) {}

  configureRoutes(): void {
    this.userRouter.get(
      "/private",
      validateAuthorizationHeader,
      this.appAuthentication.authenticateUserToken,
      (req, res) => {
        res.json("Private Route");
      },
    );

    this.userRouter.get(
      "/login",
      validateAuthorizationHeader,
      recoverLoginDataFromHeaders,
      this.authController.login,
    );
    this.userRouter.post("/register", validateUserRequestDto, this.authController.register);
  }

  public getConfiguredRouter(): Router {
    this.configureRoutes();
    return this.userRouter;
  }
}

export default AuthRouter;
