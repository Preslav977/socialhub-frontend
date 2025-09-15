import { useContext } from "react";
import { HasNewPostBeenCreatedContext } from "../../context/HasNewPostBeenCreatedContext";
import styles from "./Modal.module.css";

export function Modal() {
  const [hasNewPostBeenCreated, setHasNewPostBeenCreated] = useContext(
    HasNewPostBeenCreatedContext,
  );

  return (
    <div
      style={{
        display: hasNewPostBeenCreated ? "block" : "none",
      }}
      className={styles.modalContainer}
    >
      <div className={styles.modalClose}>
        <p>X</p>
      </div>
      <div className={styles.modalTickContainer}>
        <img
          className={styles.modalTick}
          src="/tick.svg"
          alt="successful tick"
        />
        <p>Post created!</p>
      </div>
      <p className={styles.modalBar}></p>
    </div>
  );
}
