import { AxiosError } from "axios";
import { ValidationError } from "vuct-validator";

export class ErrorUtils {
  public static hasAnyEmptyField(...fields: string[]) {
    return fields.some((field) => !field);
  }
  public static hasAnyError(errors: ValidationError) {
    return Object.values(errors).some((v) => typeof v == "string");
  }
  public static getErrorMessage(error: unknown): string | null | undefined {
    if (!(error instanceof Error)) return null;
    if (!(error instanceof AxiosError)) return error.message;

    const serverErrorMessage = error.response?.data?.message;
    return serverErrorMessage;
  }
}
