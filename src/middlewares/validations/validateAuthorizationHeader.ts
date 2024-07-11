import { header } from "express-validator";
import { validationBodyHandler } from "../../core/validation";
import { messageErrors } from "../../core/messageErrors";

export default validationBodyHandler([
  header("Authorization")
    .notEmpty()
    .withMessage(messageErrors.AUTH.AUTHORIZATION_HEADER_EMPTY),
]);
