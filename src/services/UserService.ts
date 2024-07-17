import { inject, injectable } from "inversify";
import { IUserRepository, IUserService } from "../interfaces";
import { User } from "@prisma/client";
import { IocTypes } from "../types";
import { ResourceNotFoundError } from "../core/errors";
import { messageErrors } from "../core/messageErrors";
import { UserSaveDto } from "../models/user";

@injectable()
class UserService implements IUserService {
  constructor(@inject(IocTypes.UserRepository) private userRepository: IUserRepository) {}

  async saveUser(userDto: UserSaveDto): Promise<User | null> {
    return await this.userRepository.saveUser(userDto);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new ResourceNotFoundError([messageErrors.USER.USER_NOT_FOUND]);
    return user;
  }
}

export default UserService;
