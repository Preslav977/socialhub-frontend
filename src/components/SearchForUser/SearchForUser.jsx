import { useState } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import styles from "./SearchForUser.module.css";

export function SearchForUser() {
  const [user, setUser] = useState();

  const [searchForUser, setSearchForUser] = useState("");

  async function SearchAndRenderUser(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${localhostURL}/users/search?query=${searchForUser}`,
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const result = await response.json();

      setUser(result);
    } catch (error) {
      throw error;
    }
  }

  return (
    <form
      onSubmit={SearchAndRenderUser}
      className={styles.flexedSearchForUsersWrapper}
    >
      <div className={styles.flexedSearchUsersContainer}>
        <img
          className={styles.searchForUserSVG}
          src="./search.svg"
          alt="search for user"
        />
        <label htmlFor="query"></label>
        <input
          onChange={(e) => setSearchForUser(e.target.value)}
          className={styles.searchForUserInput}
          type="text"
          name="query"
          id="query"
          placeholder="Enter a username"
          aria-label="query"
        />
      </div>
      <div className={styles.showFoundOrNotUsersContainer}>
        {!user ? (
          <p>No results</p>
        ) : (
          user.map((foundUser) => (
            <div key={foundUser.id} className={styles.foundUsersContainer}>
              <img
                className={styles.foundUserProfileImg}
                src={
                  foundUser.profile_picture === ""
                    ? "./user-default-pfp.jpg"
                    : foundUser.profile_picture
                }
                alt="user profile picture"
              />
              <div className={styles.foundUserNameContainer}>
                <Link to={`/profile/${foundUser.id}`}>
                  <p>{foundUser.username}</p>
                </Link>
                <p>{foundUser.display_name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </form>
  );
}
