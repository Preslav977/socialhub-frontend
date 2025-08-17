import { Suspense, use } from "react";
import { latestUsersPromise } from "../../api/fetchLatestUsers";
import { Loading } from "../Loading/Loading";
import styles from "./LatestUsersFetching.module.css";

export function LatestUserFetching() {
  const latestUsers = use(latestUsersPromise);

  // console.log("Latest users", latestUsers);

  return (
    <Suspense fallback={<Loading />}>
      <>
        <p>Latest users</p>
        <hr />
        {latestUsers.map((user) => (
          <div className={styles.latestUsersContainer} key={user.id}>
            <img
              className={styles.latestUsersImg}
              src="./user-default-profile-picture.jpg"
              alt="user default profile picture"
            />
            <div className={styles.lastUsersUserNameAndDisplayNameContainer}>
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
