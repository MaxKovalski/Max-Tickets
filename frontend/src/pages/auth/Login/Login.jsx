import { useState } from "react";
import LoginForm from "./LoginForm";
export default function Login() {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formInputs = new FormData(e.target);
      const formProps = Object.fromEntries(formInputs);
      await fetch(`http://localhost:2323/login`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formProps),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return <LoginForm handleSubmit={handleSubmit} />;
}
