import { useContext } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchMostFollowedUsers } from "../../api/useFetchMostFollowedUsers";
import { UserLogInContext } from "../../context/UserLogInContext";
import { Error } from "../Error/Error";
import { LoadingSkeletonUsers } from "../LoadingSkeletonUsers/LoadingSkeletonUsers";
import styles from "./MostFollowedUsers.module.css";

export function MostFollowedUsers() {
  const { mostFollowedUsers, setMostFollowedUsers, loading, error } =
    useFetchMostFollowedUsers();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  if (loading) return <LoadingSkeletonUsers users={mostFollowedUsers} />;

  if (error) return <Error error={"most followed users"} />;

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

      const [follower, following] = result;

      setMostFollowedUsers(
        mostFollowedUsers.map((mostFollowedUser) => {
          if (mostFollowedUser.id === user.id) {
            return {
              ...mostFollowedUser,
              followedBy: follower.followedBy,
              followersNumber: follower.followersNumber,
            };
          } else {
            return mostFollowedUser;
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
      <p className={styles.mostFollowedUsersPara}>Most followed</p>
      <hr className={styles.mostFollowedUsersHr} />
      <>
        {mostFollowedUsers ? (
          <ul>
            {mostFollowedUsers.map((user) => (
              <li className={styles.mostFollowedUsersContainer} key={user.id}>
                <img
                  className={styles.mostFollowedUsersImg}
                  src={
                    user.profile_picture === ""
                      ? "/user-default-pfp.jpg"
                      : user.profile_picture
                  }
                  alt="user profile picture"
                />
                <div className={styles.mostFollowedUsersUserCredentials}>
                  <Link
                    className={styles.mostFollowedUserNameAnchor}
                    to={`/profile/${user.id}`}
                  >
                    <p>{user.username}</p>
                  </Link>
                  <p>{user.display_name}</p>
                </div>
                <div className={styles.followOrUnfollowButtonContainer}>
                  <button
                    onClick={() => followMostFollowedUsers(user)}
                    className={styles.followOrUnfollowButton}
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
