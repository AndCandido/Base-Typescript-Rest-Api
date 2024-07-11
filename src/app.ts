import "reflect-metadata";
import Express from "express";
import router from "./routes";
import { globalErrorsHandler } from "./middlewares/errorHandlers";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);
app.use(globalErrorsHandler);

export default app;
