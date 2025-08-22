import { useState } from "react";

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
        />
      </div>

      <div className={styles.test}>
        {!user ? (
          <p>No results</p>
        ) : (
          user.map((foundUser) => <div>{foundUser.username}</div>)
        )}
      </div>
    </form>
  );
}
