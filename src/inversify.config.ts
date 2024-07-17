import { Container } from "inversify";
import {
  IAppRouter,
  IAuthService,
  ITokenService,
  IUserRepository,
  IUserService,
} from "./interfaces";
import { IocTypes } from "./types";
import UserRepository from "./repositories/UserRepository";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "./services/AuthService";
import TokenService from "./services/TokenService";
import AppAuthorization from "./middlewares/auth/authenticateUser";
import UserService from "./services/UserService";
import AuthRouter from "./routes/AuthRouter";
import IndexAppRouter from "./routes";

const iocContainer = new Container();

iocContainer.bind<IUserRepository>(IocTypes.UserRepository).to(UserRepository);
iocContainer.bind<IUserService>(IocTypes.UserService).to(UserService);
iocContainer.bind<IAuthService>(IocTypes.AuthService).to(AuthService);
iocContainer.bind<AuthController>(IocTypes.AuthController).to(AuthController);
iocContainer.bind<ITokenService>(IocTypes.TokenService).to(TokenService);
iocContainer.bind<AppAuthorization>(IocTypes.AppAuthorization).to(AppAuthorization);
iocContainer.bind<IAppRouter>(IocTypes.AuthRouter).to(AuthRouter);
iocContainer.bind<IAppRouter>(IocTypes.IndexAppRouter).to(IndexAppRouter);

export { iocContainer };
