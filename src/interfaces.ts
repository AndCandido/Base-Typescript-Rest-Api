import { User } from "@prisma/client";
import { UserRequestDto, UserSaveDto } from "./models/user";
import { LoginData, LoginResponseDto, TokenPayload } from "./models/auth";
import { Request } from "express";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  saveUser(user: UserSaveDto): Promise<User | null>;
}

export interface IAuthService {
  login(loginData: LoginData): Promise<LoginResponseDto>;
  register(user: UserRequestDto): Promise<User>;
}

export interface ITokenService {
  generateToken(tokenPayload: TokenPayload): string;
}

export interface RequestWithLoginData extends Request {
  loginData?: LoginData;
}
