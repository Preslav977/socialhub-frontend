import styles from "./LoadingSkeletonUsers.module.css";

export function LoadingSkeletonUsers({ users }) {
  return (
    <>
      {users ? (
        <>
          {users.map(() => (
            <div key={users.id} className={styles.skeletonContainer}>
              <div className={styles.skeletonFlexContainer}>
                <div className={styles.skeletonImg}></div>
                <div className={styles.skeletonFlexContentContainer}>
                  <div className={styles.skeletonContent}></div>
                  <div className={styles.skeletonContent}></div>
                </div>
                <div className={styles.skeletonBtn}></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
