import { ValidationResult } from "vuct-validator";
import { BaseValidator } from "vuct-validator/validators";

export class RecoveryCodeValidator extends BaseValidator {
  private RECOVERY_CODE_REGEX = /[A-Z]\d\d[A-Z]\d[A-Z]/;
  exec(value: any): ValidationResult {
    const recoveryCode = value as string;

    if (!recoveryCode.match(this.RECOVERY_CODE_REGEX))
      return { valid: false, error: this.message };

    return { valid: true };
  }
}
