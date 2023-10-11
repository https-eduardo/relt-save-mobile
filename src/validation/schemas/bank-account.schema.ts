import * as yup from "yup";
import { REQUIRED_FIELD } from "../../constants/messages";
yup.setLocale({ mixed: { required: REQUIRED_FIELD } });

export const bankAccountSchema = yup.object().shape({
  name: yup.string().required(),
  balance: yup.string().required(),
  bankId: yup.number().required().moreThan(0),
});
