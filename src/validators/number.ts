import { BaseValidatorProps, ValidationResult } from "vuct-validator";
import { BaseValidator } from "vuct-validator/validators";
import { NumberUtils } from "../utils/number";

interface NumberValidatorProps extends BaseValidatorProps {
  positive?: boolean;
  negative?: boolean;
}

export class NumberValidator extends BaseValidator {
  private positive?: boolean;
  private negative?: boolean;

  constructor({ positive, negative, message }: NumberValidatorProps) {
    super({ message });
    this.positive = positive;
    this.negative = negative;
  }

  exec(value: any): ValidationResult {
    let parsedValue = value;
    const error = {
      valid: false,
      error: this.message,
    };
    if (typeof value === "string") parsedValue = NumberUtils.unformat(value);
    if (typeof parsedValue !== "number") return error;

    if (this.positive && parsedValue <= 0) return error;
    if (this.negative && parsedValue >= 0) return error;

    return { valid: true };
  }
}
