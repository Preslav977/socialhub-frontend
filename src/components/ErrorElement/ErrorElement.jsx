import styles from "./ErrorElement.module.css";

export function ErrorElement() {
  return (
    <>
      <div className={styles.errorElementContainer}>
        <img
          className={styles.errorImg}
          src="/magnifying-glass.svg"
          alt="404 error magnifying glass"
        />
        <p className={styles.errorPara}>404 Page not found</p>
        <p>Lost in the wilderness? This page couldn't find its way also.</p>
      </div>
    </>
  );
}
