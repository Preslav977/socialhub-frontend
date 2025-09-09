import { useState } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import styles from "./SearchForUser.module.css";

export function SearchForUser() {
  const [user, setUser] = useState(null);

  const [searchForUser, setSearchForUser] = useState("");

  async function searchAndRenderUser(e) {
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
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={searchAndRenderUser}
      className={styles.flexedSearchForUsersWrapper}
    >
      <div className={styles.flexedSearchUsersContainer}>
        <img
          className={styles.searchForUserSVG}
          src="/search.svg"
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
        <>
          {user ? (
            user.map((foundUser) => (
              <div key={foundUser.id} className={styles.foundUsersContainer}>
                <img
                  className={styles.foundUserProfileImg}
                  src={
                    foundUser.profile_picture === ""
                      ? "/user-default-pfp.jpg"
                      : foundUser.profile_picture
                  }
                  alt="user profile picture"
                />
                <div className={styles.foundUserNameContainer}>
                  <Link
                    className={styles.foundUserNameAnchor}
                    to={`/profile/${foundUser.id}`}
                  >
                    <p className={styles.foundUserName}>{foundUser.username}</p>
                  </Link>
                  <p className={styles.foundUserDisplayName}>
                    {foundUser.display_name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResultsPara}>No results!</p>
          )}
        </>
      </div>
    </form>
  );
}
