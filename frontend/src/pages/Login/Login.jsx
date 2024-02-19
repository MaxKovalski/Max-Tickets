import { useState } from "react";
import LoginForm from "./LoginForm";
import "../Css/Login.css";
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formInputs = new FormData(e.target);
      const formProps = Object.fromEntries(formInputs);
      setLoginData(formProps);
      fetch(`http://localhost:2323/login`, {
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
  return (
    <div className="container">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}
