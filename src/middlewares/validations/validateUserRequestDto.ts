import { body } from "express-validator";
import { messageErrors } from "../../core/messageErrors";
import { validationBodyHandler } from "../../core/validation";

export default validationBodyHandler([
  body("name").notEmpty().withMessage(messageErrors.USER.NAME_EMPTY),
  body("email")
    .notEmpty()
    .withMessage(messageErrors.USER.EMAIL_EMPTY)
    .isEmail()
    .withMessage(messageErrors.USER.EMAIL_INVALID),
  body("password").notEmpty().withMessage(messageErrors.USER.PASSWORD_EMPTY),
]);
