import { PASSWORDS_ARE_NOT_SAME } from "../../constants";
import { passwordValidator } from "./password";
import * as yup from "yup";

export const confirmPasswordValidator = passwordValidator.oneOf(
  [yup.ref("password")],
  PASSWORDS_ARE_NOT_SAME
);
