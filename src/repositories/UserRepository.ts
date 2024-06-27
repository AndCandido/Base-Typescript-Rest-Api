import { User } from "@prisma/client";
import prismaClient from "../database";
import { IUserRepository } from "../interfaces";
import { UserRequestDto } from "../models/user";

const userDAO = prismaClient.user;

class UserRepository implements IUserRepository {
  async findById(
    id: string,
    isIncludeUserHealth: boolean = false,
  ): Promise<User | null> {
    return await userDAO.findUnique({
      where: {
        id,
      },
      include: {
        userHealth: isIncludeUserHealth,
      },
    });
  }

  async saveUser(user: UserRequestDto): Promise<User | null> {
    return await userDAO.create({
      data: user,
    });
  }
}

export default UserRepository;
