import * as yup from "yup";
import {
  INVALID_PASSWORD,
  INVALID_PASSWORD_LENGTH,
  REQUIRED_FIELD,
} from "../../constants/messages";

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*/;

export const passwordValidator = yup
  .string()
  .required(REQUIRED_FIELD)
  .min(8, INVALID_PASSWORD_LENGTH)
  .matches(PASSWORD_REGEX, INVALID_PASSWORD);
