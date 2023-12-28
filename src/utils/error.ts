import { AxiosError } from "axios";

export class ErrorUtils {
  public static getErrorMessage(error: unknown): string | null | undefined {
    if (!(error instanceof Error)) return null;
    if (!(error instanceof AxiosError)) return error.message;

    const serverErrorMessage = error.response?.data?.message;
    return serverErrorMessage;
  }
}
