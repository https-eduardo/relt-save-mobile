import * as yup from "yup";
import { REQUIRED_FIELD, TRANSACTION_NAME_INVALID } from "../../constants/messages";
yup.setLocale({ mixed: { required: REQUIRED_FIELD } });

export const transactionSchema = yup.object().shape({
  name: yup.string().required().max(32, TRANSACTION_NAME_INVALID),
  description: yup.string().required(),
  value: yup.string().required(),
  paymentDate: yup.date().required(),
  categories: yup.array().of(yup.number()).optional(),
  paymentType: yup
    .string()
    .required()
    .oneOf(["BALANCE", "PHYSICAL_MONEY", "CARD"]),
  installments: yup.number().required().moreThan(0),
});
