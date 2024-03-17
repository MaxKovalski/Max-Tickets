import React from "react";
import morning from "../../../image/authImages/morning.jpg";
import afternoon from "../../../image/authImages/afternoon.jpg";
import evening from "../../../image/authImages/evening.jpg";
import night from "../../../image/authImages/night.jpg";
import styles from "../Css/Login.module.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../../../assets/AnimatedPage";

export default function LoginForm({
  handleSubmit,
  error,
  handleFieldValidation,
  checkUser,
}) {
  let navigate = useNavigate();
  let hours = new Date().getHours();
  let messageParts;
  let imageByHours;
  if (hours >= 5 && hours < 12) {
    messageParts = ["Rise and shine!", "Let's get started"];
    imageByHours = morning;
  } else if (hours >= 12 && hours < 17) {
    messageParts = ["Good afternoon!", "Ready to dive back in?"];
    imageByHours = afternoon;
  } else if (hours >= 17 && hours < 21) {
    messageParts = ["Good evening,", "ready to wrap up your day?"];
    imageByHours = evening;
  } else if (hours >= 21) {
    messageParts = [
      "Late night?",
      "Let's quickly get you where you need to be",
    ];
    imageByHours = night;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${imageByHours})`,
      }}
    >
      <AnimatedPage>
        <div className={styles.formContainer}>
          <h4>
            {messageParts.map((part, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  part
                ) : (
                  <span className={styles.smallerText}>{part}</span>
                )}
                {index < messageParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h4>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.fieldContainer}>
              <input
                placeholder=" "
                type="text"
                name="email"
                id="email"
                onChange={handleFieldValidation}
              />

              <label htmlFor="email">Email</label>
              {error.email && <div className={styles.error}>{error.email}</div>}
            </div>

            <div className={styles.fieldContainer}>
              <input
                placeholder=" "
                type="password"
                name="password"
                id="password"
                onChange={handleFieldValidation}
              />
              <label htmlFor="password">Password</label>
              {error.password && (
                <div className={styles.error}>{error.password}</div>
              )}
            </div>

            {!checkUser ? (
              ""
            ) : (
              <div className={styles.error}>
                Please check your email or password
              </div>
            )}
            <button className={styles.loginButton} type="submit">
              Login
            </button>
            <span className={styles.signUpText}>
              Don't have an account?&nbsp;
              <button
                className={styles.signUpNavigate}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </span>
          </form>
        </div>
      </AnimatedPage>
    </div>
  );
}

function test() {
  const num = 10;
  const input = 5;
  const send = num + input;
}
