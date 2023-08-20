export interface Alert {
  text: string;
  type: AlertType;
}

export const enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}