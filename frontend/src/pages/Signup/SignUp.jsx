import { useState } from "react";
import SignUpForm from "./SignUpForm.jsx";

export default function SignUp() {
  const [error, setError] = useState("");

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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An unknown error occurred");
        console.log(error);
        return;
      }

      setError("");
      console.log("User successfully registered.");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <SignUpForm handleSubmit={handleSubmit} />
    </>
  );
}
