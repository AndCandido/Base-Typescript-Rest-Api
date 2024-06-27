import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/UserService";
import { UserRequestDto } from "../models/user";

export class UserCotroller {
  constructor(private userService: UserService) {}

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params["id"];

    try {
      const user = await this.userService.getUserByIdWithHealth(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  saveUser = async (req: Request, res: Response, next: NextFunction) => {
    const userBody = req.body as UserRequestDto;

    try {
      const userCreated = await this.userService.saveUser(userBody);
      res.status(201).send(userCreated);
    } catch (err) {
      next(err);
    }
  };
}
