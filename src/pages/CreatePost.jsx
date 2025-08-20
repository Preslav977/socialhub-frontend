import { useState } from "react";
import styles from "./CreatePost.module.css";

export function CreatePost() {
  const [postLetterLength, setPostLetterLength] = useState("0");

  return (
    <form className={styles.formCreatePostContainer}>
      <textarea
        className={styles.formTextarea}
        onChange={(e) => setPostLetterLength(e.target.value.length)}
        placeholder="Share whats happening..."
        name="text"
        id="text"
        rows={3}
      ></textarea>

      <div className={styles.formFlexedControlsContainer}>
        <div className={styles.formControls}>
          <img
            className={styles.formControlsImg}
            src="./upload-image.svg"
            alt="uploading a image"
          />
          <input type="file" name="file" id="file" />

          <img
            className={styles.formControlsImg}
            src="./add-tag.svg"
            alt="adding a tag"
          />
        </div>

        <div className={styles.formFlexedLengthContainer}>
          <p>{postLetterLength}/2000</p>
          <button className={styles.submitPostBtn} type="submit">
            Post
          </button>
        </div>
      </div>

      <div className={styles.formTagFlexedContainer}>
        <label htmlFor="tags">Tags:</label>
        <input
          className={styles.formInputTag}
          type="text"
          name="tags"
          id="tags"
        />
      </div>
    </form>
  );
}
