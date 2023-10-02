import { INVALID_EMAIL, REQUIRED_FIELD } from "../../constants/messages";
import * as yup from "yup";

export const emailValidator = yup
  .string()
  .required(REQUIRED_FIELD)
  .email(INVALID_EMAIL);
