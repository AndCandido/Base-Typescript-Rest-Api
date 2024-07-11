export type LoginResponseDto = {
  token: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type TokenPayload = {
  username: string;
  email: string;
};
