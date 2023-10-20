import * as yup from "yup";
import { passwordValidator } from "../validators/password";
import { INVALID_USERNAME_LENGTH } from "../../constants";
import { recoveryCodeValidator } from "../validators/recovery-code";
import { emailValidator } from "../validators/email";
import { confirmPasswordValidator } from "../validators/confirm-password";
import { REQUIRED_FIELD } from "../../constants";
yup.setLocale({ mixed: { required: REQUIRED_FIELD } });

export const mailLoginSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
});

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(4, INVALID_USERNAME_LENGTH),
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailValidator,
});

export const profileSchema = yup.object().shape({
  username: yup.string().required().min(4, INVALID_USERNAME_LENGTH),
});

export const recoverPasswordSchema = yup.object().shape({
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
});

export const recoveryCodeSchema = yup.object().shape({
  code: recoveryCodeValidator,
});
