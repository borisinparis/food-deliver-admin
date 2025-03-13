import * as Yup from "yup";
import { object, string } from "yup";

export let userSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
});
