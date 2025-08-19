import { useFetchMostFollowedUsers } from "../../api/useFetchMostFollowedUsers";
import styles from "./MostFollowedUsers.module.css";

export function MostFollowedUsers() {
  const { mostFollowedUsers, loading, error } = useFetchMostFollowedUsers();

  if (loading) {
    return <p>Loading most followed users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
            className={styles.mostFollowedUsersUserNameAndDisplayNameContainer}
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
  );
}
