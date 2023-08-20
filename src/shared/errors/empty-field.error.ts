export class EmptyFieldError extends Error {
  message: string = "Você tem que preencher todos os campos.";
  constructor(msg?: string, options?: ErrorOptions) {
    super(msg, options);
  }
}
