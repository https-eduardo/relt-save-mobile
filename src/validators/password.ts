import { ValidationResult } from "vuct-validator";
import { BaseValidator } from "vuct-validator/validators";

export class PasswordValidator extends BaseValidator {
  private PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*/;

  exec(value: any): ValidationResult {
    const password = value as string;
    if (!password.match(this.PASSWORD_REGEX))
      return {
        valid: false,
        error: this.message,
      };
    return { valid: true };
  }
}
