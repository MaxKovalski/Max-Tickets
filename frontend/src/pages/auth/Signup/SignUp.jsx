import React from "react";
import SignUpForm from "./SignUpForm.jsx";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
const schema = Joi.object({
  first: Joi.string().min(2).required().messages({
    "string.empty": "*First name is required",
    "string.min": "*First name must be at least 2 characters",
  }),
  last: Joi.string().min(2).required().messages({
    "string.empty": "*Last name is required",
    "string.min": "*Last name must be at least 2 characters",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "*Email Address is required",
    "string.email": "*Email must be a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/)
    .required()
    .messages({
      "string.empty": "*Password is required",
      "string.min": "*Password must be at least 8 characters long",
      "string.max": "*Password must not exceed 32 characters",
      "string.pattern.base":
        "*Password must contain at least one uppercase letter and one special character",
    }),
});
export default function SignUp() {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState({});
  let navigate = useNavigate();
  const handleFieldValidation = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
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
    e.preventDefault();
    try {
      const formInputs = new FormData(e.target);
      const formProps = Object.fromEntries(formInputs);
      const payload = {
        name: {
          first: formProps.first || "",
          last: formProps.last || "",
        },
        email: formProps.email,
        password: formProps.password,
      };

      const response = await fetch(`http://localhost:2323/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 409) {
        return setError((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
      } else if (response.ok) {
        navigate("/login");
      } else {
        const error = await response.json();
        console.error("Error submitting form:", error);
        setError("An unexpected error occurred.");
      }
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <SignUpForm
        handleSubmit={handleSubmit}
        error={error}
        handleFieldValidation={handleFieldValidation}
      />
    </>
  );
}
