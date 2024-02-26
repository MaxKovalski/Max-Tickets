import SignUpForm from "./SignUpForm.jsx";

export default function SignUp() {
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
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <SignUpForm handleSubmit={handleSubmit} />
    </>
  );
}
