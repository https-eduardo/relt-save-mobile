export class InvalidValueError extends Error {
  message: string = "Algum campo possui valores inválidos.";
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    if (message) this.message = message;
  }
}
