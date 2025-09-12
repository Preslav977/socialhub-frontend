import styles from "./ErrorElement.module.css";

export function ErrorElement({ textProp, textDescriptionProp }) {
  return (
    <>
      <div className={styles.errorElementContainer}>
        <img
          className={styles.errorImg}
          src="/magnifying-glass.svg"
          alt="404 error magnifying glass"
        />
        <p className={styles.errorPara}>{textProp}</p>
        <p>{textDescriptionProp}</p>
      </div>
    </>
  );
}
