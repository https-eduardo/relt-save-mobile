import { ValidationResult, ValidationRules } from "vuct-validator";
import {
  BaseValidator,
  EmailValidator,
  LengthValidator,
} from "vuct-validator/validators";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_PASSWORD_LENGTH,
  INVALID_RECOVERY_CODE_LENGTH,
  INVALID_USERNAME_LENGTH,
  NOT_POSITIVE,
  RECOVERY_CODE_INVALID,
  TRANSACTION_NAME_INVALID,
} from "./messages";
import { PasswordValidator } from "../validators/password";
import { RecoveryCodeValidator } from "../validators/recovery-code";
import { NumberValidator } from '../validators/number';

export const VALIDATION_RULES: ValidationRules = {
  username: {
    validators: [
      new LengthValidator({ min: 4, message: INVALID_USERNAME_LENGTH }),
    ],
    required: true,
  },
  email: {
    validators: [new EmailValidator({ message: INVALID_EMAIL })],
    required: true,
  },
  password: {
    validators: [
      new PasswordValidator({ message: INVALID_PASSWORD }),
      new LengthValidator({ min: 8, message: INVALID_PASSWORD_LENGTH }),
    ],
    required: true,
  },
  recoveryCode: {
    validators: [
      new RecoveryCodeValidator({ message: RECOVERY_CODE_INVALID }),
      new LengthValidator({
        min: 6,
        max: 6,
        message: INVALID_RECOVERY_CODE_LENGTH,
      }),
    ],
    required: true,
  },
  transactionName: {
    validators: [
      new LengthValidator({
        min: 4,
        max: 32,
        message: TRANSACTION_NAME_INVALID,
      }),
    ],
    required: true,
  },
  positiveValue: {
    validators: [
      new NumberValidator({
        positive: true,
        message: NOT_POSITIVE,
      }),
    ],
    required: true,
  },
};
