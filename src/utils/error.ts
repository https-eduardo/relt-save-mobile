import { AxiosError } from "axios";
import { ValidationError } from "vuct-validator";

export class ErrorUtils {
  public static hasAnyEmptyField(...fields: string[]) {
    return fields.some((field) => !field);
  }
  public static hasAnyError(errors: ValidationError) {
    return Object.values(errors).some((v) => typeof v == "string");
  }
  public static getErrorMessage(error: unknown) {
    if (!(error instanceof Error) || error instanceof AxiosError) return null;
    return error.message;
  }
}
