import { useContext } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchLatestUsers } from "../../api/useFetchLatestUsers";
import { UserLogInContext } from "../../context/UserLogInContext";
import { Error } from "../Error/Error";
import { LoadingSkeletonUsers } from "../LoadingSkeletonUsers/LoadingSkeletonUsers";
import styles from "./LatestUsers.module.css";

export function LatestUser() {
  const { latestUsers, setLatestUsers, loading, error } = useFetchLatestUsers();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  if (loading) return <LoadingSkeletonUsers users={latestUsers} />;

  if (error) return <Error error={"latest users"} />;

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

      const [follower, following] = result;

      setLatestUsers(
        latestUsers.map((latestUser) => {
          if (latestUser.id === user.id) {
            return {
              ...latestUser,
              followedBy: follower.followedBy,
              followersNumber: follower.followersNumber,
            };
          } else {
            return latestUser;
          }
        }),
      );

      const updateLoggedInUser = {
        ...userLogIn,
        following: following.following,
        followingNumber: following.followingNumber,
      };

      setUserLogIn(updateLoggedInUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p className={styles.latestUsersPara}>Latest users</p>
      <hr className={styles.latestUsersHr} />
      <>
        {latestUsers ? (
          <ul>
            {latestUsers.map((user) => (
              <li className={styles.latestUsersContainer} key={user.id}>
                <img
                  className={styles.latestUsersImg}
                  src={
                    user.profile_picture === ""
                      ? "/user-default-pfp.jpg"
                      : user.profile_picture
                  }
                  alt="user profile picture"
                />
                <div className={styles.latestUserCredentials}>
                  <Link
                    className={styles.latestUserNameAnchor}
                    to={`/profile/${user.id}`}
                  >
                    <p>{user.username}</p>
                  </Link>
                  <p className={styles.laterUserDisplayName}>
                    {user.display_name}
                  </p>
                </div>
                <div className={styles.followOrUnfollowButtonContainer}>
                  <button
                    onClick={() => followLatestUsers(user)}
                    className={
                      !userLogIn.following.some(
                        (followedUser) => followedUser.id === user.id,
                      )
                        ? styles.followButton
                        : styles.unFollowButton
                    }
                  >
                    {!userLogIn.following.some(
                      (followedUser) => followedUser.id === user.id,
                    )
                      ? "Follow"
                      : "Unfollow"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </>
    </>
  );
}
