import { ValidationRules } from "vuct-validator";
import { EmailValidator, LengthValidator } from "vuct-validator/validators";

const INVALID_EMAIL = "Esse email não é válido.";
const INVALID_PASSWORD_LENGTH = "Sua senha precisa ter ao menos 8 caracteres.";

export const VALIDATION_RULES: ValidationRules = {
  email: {
    validators: [new EmailValidator({ message: INVALID_EMAIL })],
  },
  password: {
    validators: [
      new LengthValidator({ min: 8, message: INVALID_PASSWORD_LENGTH }),
    ],
  },
};
