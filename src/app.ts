import "reflect-metadata";
import Express from "express";
import { globalErrorsHandler } from "./middlewares/errorHandlers";
import { iocContainer } from "./inversify.config";
import { IocTypes } from "./types";
import { IAppRouter } from "./interfaces";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const appRouter = iocContainer.get<IAppRouter>(IocTypes.IndexAppRouter);

app.use(appRouter.getConfiguredRouter());
app.use(globalErrorsHandler);

export default app;
