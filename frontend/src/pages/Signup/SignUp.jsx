import { useState } from "react";
import SignUpForm from "./SignUpForm.jsx";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    try {
      const formInputs = new FormData(e.target);
      const formProps = Object.fromEntries(formInputs);
      setSignUpData(formProps);
      fetch(`http://localhost:2323/signup`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formProps),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Sign Up</h4>
      <SignUpForm handleSubmit={handleSubmit} />
    </div>
  );
}
