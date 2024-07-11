export type UserRequestDto = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserSaveDto = {
  name: string;
  username: string;
  email: string;
  encryptedPassword: string;
};
