import styles from "./LoadingSkeletonProps.module.css";

export function LoadingSkeletonProps() {
  return (
    <>
      <div className={styles.skeletonFlexContainer}>
        <div className={styles.skeletonImg}></div>
        <div className={styles.skeletonContent}></div>
        <div className={styles.skeletonContent}></div>
      </div>
      <div className={styles.skeletonFullWidthContent}></div>
      <div className={styles.skeletonFullWidthContent}></div>
    </>
  );
}
