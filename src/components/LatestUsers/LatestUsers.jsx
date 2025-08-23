import { useContext } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchLatestUsers } from "../../api/useFetchLatestUsers";
import { UserLogInContext } from "../../context/UserLogInContext";
import { Error } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import styles from "./LatestUsers.module.css";

export function LatestUser() {
  const { latestUsers, loading, error } = useFetchLatestUsers();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  if (loading) {
    return <Loading message={"latest users"} />;
  }

  if (error) {
    return <Error error={"latest users"} />;
  }

  async function followLatestUsers(user) {
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
      <p>Latest users</p>
      <hr />
      {latestUsers.map((user) => (
        <div className={styles.latestUsersContainer} key={user.id}>
          <img
            className={styles.latestUsersImg}
            src={
              user.profile_picture === ""
                ? "./user-default-pfp.jpg"
                : user.profile_picture
            }
            alt="user profile picture"
          />
          <div className={styles.lastUsersUserNameAndDisplayNameContainer}>
            <Link
              className={styles.lastUserNameAnchor}
              to={`/profile/${user.id}`}
            >
              <p>{user.username}</p>
            </Link>
            <p>{user.display_name}</p>
          </div>
          <div className={styles.followOrUnfollowButtonContainer}>
            <button
              onClick={() => followLatestUsers(user)}
              className={styles.followOrUnfollowButton}
            >
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
