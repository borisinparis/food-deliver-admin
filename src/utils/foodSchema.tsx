import * as yup from "yup";
export const foodSchema = yup.object({
  foodName: yup.string().min(1).required(),
  ingredients: yup.string().min(1).required(),
  price: yup.number().min(1),
  image: yup.string().nullable(),
});
