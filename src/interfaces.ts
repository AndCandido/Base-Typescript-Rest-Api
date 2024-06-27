import { User } from "@prisma/client";
import { UserRequestDto } from "./models/user";

export interface IUserRepository {
  findById(id: string, isIncludeUserHealth?: boolean): Promise<User | null>;
  saveUser(user: UserRequestDto): Promise<User | null>;
}

export interface IUserService {
  getUserByIdWithHealth(userId: string): Promise<User>;
  saveUser(user: UserRequestDto): Promise<User>;
}
