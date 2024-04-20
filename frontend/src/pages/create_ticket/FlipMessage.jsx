import styles from "./flipMessage.module.css";
export default function FlipMessage({ isFlipped }) {
  return (
    <div className={styles.containerStyle}>
      <div
        className={`${styles.flipper}`}
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className={styles.back}>
          <h1>Your ticket has been opened successfully!</h1>
        </div>
      </div>
    </div>
  );
}
