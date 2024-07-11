const USER = {
  NAME_EMPTY: "name is required",
  USERNAME_EMPTY: "username is required",
  PASSWORD_EMPTY: "password is required",
  EMAIL_INVALID: "valid email required",
  EMAIL_EMPTY: "email is required",
  USER_NOT_FOUND: "user not found",
  ERROR_SAVING_USER: "error saving user",
};

const AUTH = {
  AUTHORIZATION_HEADER_EMPTY: "Authorization header is required",
};

const REQUEST = {
  CREDENTIALS_ERROR: "credentials error",
  CREDENTIALS_MISSING: "username or password is missing",
  INCORRECT_PASSWORD: "incorrect password",
};

const API = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

export const messageErrors = {
  USER,
  AUTH,
  REQUEST,
  API,
};
