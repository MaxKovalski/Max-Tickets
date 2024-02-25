import Joi from "joi";
const userValidation = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().min(2).max(50).required(),
      last: Joi.string().min(2).max(50).required(),
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('"email" must be a valid email address')
    .required(),
  password: Joi.string()
    .pattern(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .message(
      '"Password" must be 7-20 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character (!@#$%^&*-).'
    )
    .required(),
});
export { userValidation };
