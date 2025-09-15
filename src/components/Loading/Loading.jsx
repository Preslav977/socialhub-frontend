import styles from "./Loading.module.css";

export function Loading() {
  return (
    <>
      <div className={styles.loadingSpinnerContainer}>
        <img
          className="loadingSpinner"
          src="/loading.svg"
          alt="loading spinner"
        />
      </div>
    </>
  );
}
