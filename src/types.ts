export const IocTypes = {
  UserRepository: Symbol.for("IUserRepository"),
  UserService: Symbol.for("UserService"),
  AuthService: Symbol.for("IAuthService"),
  AuthController: Symbol.for("AuthController"),
  TokenService: Symbol.for("ITokenService"),
  AppAuthorization: Symbol.for("AppAuthorization"),
  AuthRouter: Symbol.for("AuthRouter"),
  IndexAppRouter: Symbol.for("IndexAppRouter"),
};
