import { Suspense, use } from "react";
import { mostFollowedUsersPromise } from "../../api/fetchMostFollowedUsers";
import { Loading } from "../Loading/Loading";
import styles from "./MostFollowedUsers.module.css";

export function MostFollowedUsers() {
  const mostFollowedUsers = use(mostFollowedUsersPromise);

  // console.log("Most followed", mostFollowedUsers);

  return (
    <Suspense fallback={<Loading />}>
      <>
        <p>Most followed</p>
        <hr />
        {mostFollowedUsers.map((user) => (
          <div className={styles.mostFollowedUsersContainer} key={user.id}>
            <img
              className={styles.mostFollowedUsersImg}
              src="./user-default-profile-picture.jpg"
              alt="user default profile picture"
            />
            <div
              className={
                styles.mostFollowedUsersUserNameAndDisplayNameContainer
              }
            >
              <p>{user.username}</p>
              <p>{user.display_name}</p>
            </div>
            <div className={styles.followOrUnfollowButtonContainer}>
              <button className={styles.followOrUnfollowButton}>Follow</button>
            </div>
          </div>
        ))}
      </>
    </Suspense>
  );
}
