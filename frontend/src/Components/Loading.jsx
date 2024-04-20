import styles from "./Css/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={`${styles.line} ${styles.d1}`}></div>
      <div className={`${styles.line} ${styles.d2}`}></div>
      <div className={`${styles.line} ${styles.d3}`}></div>
      <div className={`${styles.line} ${styles.d4}`}></div>
      <div className={`${styles.line} ${styles.d5}`}></div>
      <br />
      <div className={styles.caption}>
        <p style={{ display: "inline-block" }}>Loading</p>
        <div className={`${styles.dot}`}>.</div>
        <div className={`${styles.dot}`}>.</div>
        <div className={`${styles.dot}`}>.</div>
      </div>
    </div>
  );
}
