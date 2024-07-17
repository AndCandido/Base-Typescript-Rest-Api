import { Router } from "express";
import { IocTypes } from "../types";
import { inject, injectable } from "inversify";
import { IAppRouter } from "../interfaces";

@injectable()
class IndexAppRouter implements IAppRouter {
  private router = Router();
  constructor(@inject(IocTypes.AuthRouter) private authRouter: IAppRouter) {}

  public configureRoutes(): void {
    this.router.use("/auth", this.authRouter.getConfiguredRouter());
  }

  public getConfiguredRouter(): Router {
    this.configureRoutes();
    return this.router;
  }
}

export default IndexAppRouter;
