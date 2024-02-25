import styles from "../Css/SignUp.module.css";
import { useNavigate } from "react-router-dom";
export default function SignUpForm({ handleSubmit }) {
  let navigate = useNavigate();
  const Sentences = [
    "Where Solutions Meet Efficiency.",
    "Streamlining Success, One Ticket at a Time.",
    "Solve Smarter, Not Harder.",
    "Crafting Tomorrow’s Solutions Today.",
    "Making Every Ticket Count.",
    "The Future of IT Support Starts Here.",
  ];
  const getRandomSentence = () => {
    const randomNumber = Math.floor(Math.random() * Sentences.length);
    return Sentences[randomNumber];
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h4>
          Sign Up
          <br />
          <span className={styles.smallerText}>{getRandomSentence()}</span>
        </h4>

        <form onSubmit={handleSubmit} className={styles.signUpForm}>
          <div className={styles.fieldContainer}>
            <input placeholder=" " type="text" name="first" id="first" />
            <label htmlFor="first">Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input placeholder=" " type="text" name="last" id="last" />
            <label htmlFor="last">Last Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input placeholder=" " type="text" name="email" id="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              placeholder=" "
              type="password"
              name="password"
              id="password"
            />
            <label htmlFor="password">Password</label>
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
  );
}
