import AnimatedPage from "../../../assets/AnimatedPage";
import styles from "../Css/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import morning from "../../../image/authImages/morning.jpg";
import afternoon from "../../../image/authImages/afternoon.jpg";
import evening from "../../../image/authImages/evening.jpg";
import night from "../../../image/authImages/night.jpg";
import React from "react";
export default function SignUpForm({
  handleSubmit,
  error,
  handleFieldValidation,
}) {
  let navigate = useNavigate();
  const Sentences = [
    "Where Solutions Meet Efficiency.",
    "Streamlining Success, One Ticket at a Time.",
    "Solve Smarter, Not Harder.",
    "Crafting Tomorrow’s Solutions Today.",
    "Making Every Ticket Count.",
    "The Future of IT Support Starts Here.",
  ];
  const [randomSentence] = React.useState(() => {
    const randomNumber = Math.floor(Math.random() * Sentences.length);
    return Sentences[randomNumber];
  });
  let hours = new Date().getHours();
  let imageByHours;
  if (hours >= 0 && hours < 12) {
    imageByHours = morning;
  } else if (hours >= 12 && hours < 17) {
    imageByHours = afternoon;
  } else if (hours >= 17 && hours < 21) {
    imageByHours = evening;
  } else if (hours >= 21) {
    imageByHours = night;
  }

  return (
    <div
      style={{
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        backgroundImage: `url(${imageByHours})`,
      }}
      className={styles.container}
    >
      <AnimatedPage>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h4>
              Sign Up
              <br />
              <span className={styles.smallerText}>{randomSentence}</span>
            </h4>

            <form onSubmit={handleSubmit} className={styles.signUpForm}>
              <div className={styles.fieldContainer}>
                <input
                  placeholder=" "
                  type="text"
                  name="first"
                  id="first"
                  onChange={handleFieldValidation}
                />
                <label htmlFor="first">Name</label>
                {error.first && (
                  <div className={styles.error}>{error.first}</div>
                )}
              </div>
              <div className={styles.fieldContainer}>
                <input
                  placeholder=" "
                  type="text"
                  name="last"
                  id="last"
                  onChange={handleFieldValidation}
                />
                <label htmlFor="last">Last Name</label>
                {error.last && <div className={styles.error}>{error.last}</div>}
              </div>
              <div className={styles.fieldContainer}>
                <input
                  placeholder=" "
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleFieldValidation}
                />
                <label htmlFor="email">Email</label>

                {error.email && (
                  <div className={styles.error}>{error.email}</div>
                )}
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

              <button className={styles.signUpButton} type="submit">
                Sign Up
              </button>
              <span className={styles.loginText}>
                Already have account?&nbsp;
                <button
                  className={styles.loginNavigate}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </span>
            </form>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
}
