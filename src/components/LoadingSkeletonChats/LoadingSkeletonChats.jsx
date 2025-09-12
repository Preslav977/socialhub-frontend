import styles from "./LoadingSkeletonChats.module.css";

export function LoadingSkeletonChats({ chats }) {
  return (
    <>
      {chats ? (
        <>
          {chats.map((chat) => (
            <div key={chat.id} className={styles.skeletonContainer}>
              <div className={styles.skeletonFlexContainer}>
                <div>
                  <div className={styles.skeletonImg}></div>
                </div>
                <div className={styles.skeletonContent}></div>
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
