import { Router } from "express";

import { UserCotroller } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import UserRepository from "../repositories/UserRepository";

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserCotroller(userService);

userRouter.get("/:id", userController.getUser);
userRouter.post("", userController.saveUser);

export default userRouter;
