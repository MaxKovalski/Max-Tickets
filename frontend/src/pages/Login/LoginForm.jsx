import React from "react"; // Ensure React is in scope if using JSX
import "../Css/Login.css";
export default function LoginForm({ handleSubmit }) {
  let hours = new Date().getHours();
  let messageParts; // Use an array to hold parts of the message
  if (hours >= 0 && hours < 12) {
    messageParts = ["Rise and shine!", "Let's get started"];
  } else if (hours >= 12 && hours < 17) {
    messageParts = ["Good afternoon!", "Ready to dive back in?"];
  } else if (hours >= 17 && hours < 21) {
    messageParts = ["Good evening,", "ready to wrap up your day?"];
  } else if (hours >= 21) {
    messageParts = [
      "Late night?",
      "Let's quickly get you where you need to be",
    ];
  }

  return (
    <div className="form-container">
      <h4>
        {messageParts.map((part, index) => (
          <React.Fragment key={index}>
            {index === 0 ? part : <span className="smaller-text">{part}</span>}
            {index < messageParts.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h4>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="field-container">
          <input placeholder=" " type="text" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="field-container">
          <input
            placeholder=" "
            type="password"
            name="password"
            id="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
