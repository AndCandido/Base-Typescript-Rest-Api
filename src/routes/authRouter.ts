import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import validateUserRequestDto from "../middlewares/validations/validateUserRequestDto";
import { iocContainer } from "../inversify.config";
import { IocTypes } from "../types";
import validateAuthorizationHeader from "../middlewares/validations/validateAuthorizationHeader";
import { recoverLoginDataFromHeaders } from "../middlewares/auth/recoverLoginDataFromHeaders";
import AppAuthorization from "../middlewares/auth/authenticateUser";

export default function userRouter() {
  const userRouter = Router();

  const authController = iocContainer.get<AuthController>(
    IocTypes.AuthController,
  );
  const appAuthentication = iocContainer.get<AppAuthorization>(
    IocTypes.AppAuthorization,
  );

  userRouter.get(
    "/private",
    validateAuthorizationHeader,
    appAuthentication.authenticateUserToken,
    (req, res) => {
      res.json("Private Route");
    },
  );

  userRouter.get(
    "/login",
    validateAuthorizationHeader,
    recoverLoginDataFromHeaders,
    authController.login,
  );
  userRouter.post("/register", validateUserRequestDto, authController.register);

  return userRouter;
}
