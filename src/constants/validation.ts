import { ValidationRules } from "vuct-validator";
import { EmailValidator, LengthValidator } from "vuct-validator/validators";

const INVALID_EMAIL = "Esse email não é válido.";
const INVALID_PASSWORD_LENGTH = "Sua senha precisa ter ao menos 8 caracteres.";
const INVALID_USERNAME_LENGTH =
  "Seu nome de usuário precisa ter ao menos 4 caracteres.";
const INVALID_RECOVERY_CODE_LENGTH_ =
  "O código de recuperação tem apenas 6 caracteres.";

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
      new LengthValidator({ min: 8, message: INVALID_PASSWORD_LENGTH }),
    ],
    required: true,
  },
  recoveryCode: {
    validators: [
      new LengthValidator({
        min: 6,
        max: 6,
        message: INVALID_RECOVERY_CODE_LENGTH_,
      }),
    ],
    required: true,
  },
};
