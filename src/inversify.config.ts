import { Container } from "inversify";
import { IAuthService, ITokenService, IUserRepository } from "./interfaces";
import { IocTypes } from "./types";
import UserRepository from "./repositories/UserRepository";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "./services/AuthService";
import TokenService from "./services/TokenService";

const iocContainer = new Container();

iocContainer.bind<IUserRepository>(IocTypes.UserRepository).to(UserRepository);
iocContainer.bind<IAuthService>(IocTypes.AuthService).to(AuthService);
iocContainer.bind<AuthController>(IocTypes.AuthController).to(AuthController);
iocContainer.bind<ITokenService>(IocTypes.TokenService).to(TokenService);

export { iocContainer };
