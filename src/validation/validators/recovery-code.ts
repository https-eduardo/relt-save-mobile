import {
  RECOVERY_CODE_INVALID,
  REQUIRED_FIELD,
} from "../../constants/messages";
import * as yup from "yup";
const RECOVERY_CODE_REGEX = /[A-Z]\d\d[A-Z]\d[A-Z]/;

export const recoveryCodeValidator = yup
  .string()
  .required(REQUIRED_FIELD)
  .matches(RECOVERY_CODE_REGEX, RECOVERY_CODE_INVALID);
