import { LatestUser } from "../LatestUsers/LatestUsers";
import { MostFollowedUsers } from "../MostFollowedUsers/MostFollowedUsers";
import styles from "./LatestAndMostFollowedUsers.module.css";

export function LatestAndMostFollowedUsers() {
  return (
    <>
      <div className={styles.latestUsersContainer}>
        <LatestUser />
      </div>

      <div className={styles.mostFollowedUsersContainer}>
        <MostFollowedUsers />
      </div>

      <div className={styles.announcementsContainer}>
        <p>Announcements</p>
        <hr />
        <li>Added latest users feature</li>
        <li>Added most followed users feature</li>
      </div>
    </>
  );
}
