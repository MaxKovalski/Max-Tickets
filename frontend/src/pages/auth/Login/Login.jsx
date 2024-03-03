import React from "react";
import LoginForm from "./LoginForm";
import Joi from "joi";
const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "*Email Address is required",
    "string.email": "*Email must be a valid email address",
  }),
  password: Joi.string().min(8).max(32).required().messages({
    "string.empty": "*Password is required",
    "string.min": "*Password must be at least 8 characters",
    "string.max": "*Password must not exceed 32 characters",
    "string.pattern.base": "",
  }),
});
export default function Login() {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState({});
  const [checkUser, setCheckUser] = React.useState(false);
  const handleFieldValidation = (event) => {
    const { name, value } = event.target;
    const object = { ...formData, [name]: value };
    setFormData(object);
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    if (error) {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: error.details[0].message,
      }));
    } else {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (Object.keys(error).length === 0) {
        const formInputs = new FormData(e.target);
        const formProps = Object.fromEntries(formInputs);
        const response = await fetch(`http://localhost:2323/login`, {
          credentials: "include",
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formProps),
        });
        const data = await response.json();

        if (!response.ok) {
          setCheckUser(true);
          console.error(checkUser);
        } else if (data.error) {
          setCheckUser(true);
          console.error(checkUser);
        } else {
          setCheckUser(false);
          console.error(checkUser);
        }
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginForm
      handleSubmit={handleSubmit}
      error={error}
      handleFieldValidation={handleFieldValidation}
      checkUser={checkUser}
    />
  );
}
