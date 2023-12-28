import * as yup from "yup";
import { REQUIRED_FIELD } from "../../constants";
yup.setLocale({ mixed: { required: REQUIRED_FIELD } });

export const bankCardSchema = yup.object().shape({
  name: yup.string().required(),
  finalNumbers: yup.string().required(),
  cardType: yup.string().length(4).matches(/^\d+$/),
});
