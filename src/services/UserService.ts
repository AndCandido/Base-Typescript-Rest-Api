import { User } from "@prisma/client";
import { IUserRepository, IUserService } from "../interfaces";
import { UserRequestDto } from "../models/user";
import { ResourceNotFoundError } from "../core/errors";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserByIdWithHealth(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId, true);
    if (!user) throw new ResourceNotFoundError("user not found");
    return user;
  }

  async saveUser(userDto: UserRequestDto): Promise<User> {
    const user = await this.userRepository.saveUser(userDto);
    if (!user) throw new ResourceNotFoundError("error saving user");
    return user;
  }
}
