// import { LoadingSkeletonProps } from "../LoadingSkeletonProps/LoadingSkeletonProps";
import styles from "./LoadingSkeleton.module.css";

export function LoadingSkeleton({ prop }) {
  return (
    <>
      {prop ? (
        <>
          {prop.map(() => (
            <div key={prop.id} className={styles.skeletonContainer}>
              <div className={styles.skeletonFlexContainer}>
                <div className={styles.skeletonImg}></div>
                <div className={styles.skeletonContent}></div>
                <div className={styles.skeletonContent}></div>
              </div>
              <div className={styles.skeletonFullWidthContent}></div>
              <div className={styles.skeletonFullWidthContent}></div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
