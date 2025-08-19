import { useContext } from "react";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchMostFollowedUsers } from "../../api/useFetchMostFollowedUsers";
import { UserLogInContext } from "../../context/UserLogInContext";
import { Error } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import styles from "./MostFollowedUsers.module.css";

export function MostFollowedUsers() {
  const { mostFollowedUsers, loading, error } = useFetchMostFollowedUsers();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  if (loading) {
    return <Loading message={"most followed users"} />;
  }

  if (error) {
    return <Error error={"most followed users"} />;
  }

  async function followMostFollowedUsers(user) {
    try {
      const response = await fetch(
        `${localhostURL}/users/following/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: user.id,
          }),
        },
      );

      const result = await response.json();

      setUserLogIn(result);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <p>Most followed</p>
      <hr />
      {mostFollowedUsers.map((user) => (
        <div className={styles.mostFollowedUsersContainer} key={user.id}>
          <img
            className={styles.mostFollowedUsersImg}
            src={
              user.profile_picture === ""
                ? "./user-default-profile-picture.jpg"
                : user.profile_picture
            }
            alt="user profile picture"
          />
          <div
            className={styles.mostFollowedUsersUserNameAndDisplayNameContainer}
          >
            <p>{user.username}</p>
            <p>{user.display_name}</p>
          </div>
          <div className={styles.followOrUnfollowButtonContainer}>
            <button
              onClick={() => followMostFollowedUsers(user)}
              className={styles.followOrUnfollowButton}
            >
              {" "}
              {!userLogIn.following.some(
                (followedUser) => followedUser.id === user.id,
              )
                ? "Follow"
                : "Unfollow"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
