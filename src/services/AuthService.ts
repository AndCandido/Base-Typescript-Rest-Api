import { config } from "dotenv";
import { User } from "@prisma/client";
import { IUserRepository, IAuthService, ITokenService } from "../interfaces";
import { UserRequestDto, UserSaveDto } from "../models/user";
import { BaseError, ResourceNotFoundError } from "../core/errors";
import bcryptjs from "bcryptjs";
import { inject, injectable } from "inversify";
import { IocTypes } from "../types";
import { LoginData, LoginResponseDto } from "../models/auth";
import { messageErrors } from "../core/messageErrors";

config();

@injectable()
export class AuthService implements IAuthService {
  public constructor(
    @inject(IocTypes.UserRepository) private userRepository: IUserRepository,
    @inject(IocTypes.TokenService) private tokenService: ITokenService,
  ) {}

  async login(loginData: LoginData): Promise<LoginResponseDto> {
    const user = await this.getUserByUsername(loginData.username);

    const isPasswordCorrect = await bcryptjs.compare(
      loginData.password,
      user.encryptedPassword,
    );

    if (!isPasswordCorrect) {
      throw new BaseError([messageErrors.REQUEST.INCORRECT_PASSWORD]);
    }

    const tokenPayload = { username: user.name, email: user.email };
    const token = this.tokenService.generateToken(tokenPayload);
    return { token };
  }

  async getUserByUsername(userId: string): Promise<User> {
    const user = await this.userRepository.findByUsername(userId);
    if (!user)
      throw new ResourceNotFoundError([messageErrors.USER.USER_NOT_FOUND]);
    return user;
  }

  async register(userReqDto: UserRequestDto): Promise<User> {
    const encryptedPassword = await this.encryptPassword(userReqDto.password);
    const userSaveDto: UserSaveDto = {
      name: userReqDto.name,
      username: userReqDto.username,
      email: userReqDto.email,
      encryptedPassword,
    };

    const user = await this.userRepository.saveUser(userSaveDto);
    if (!user)
      throw new ResourceNotFoundError([messageErrors.USER.ERROR_SAVING_USER]);
    return user;
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }
}
