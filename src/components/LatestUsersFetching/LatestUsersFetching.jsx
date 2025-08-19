import { useFetchLatestUsers } from "../../api/useFetchLatestUsers";
import styles from "./LatestUsersFetching.module.css";

export function LatestUserFetching() {
  const { latestUsers, loading, error } = useFetchLatestUsers();

  if (loading) {
    return <p>Loading latest users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
  );
}
