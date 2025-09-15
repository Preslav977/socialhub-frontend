import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Footer.module.css";

export function Footer() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const location = useLocation();

  const { pathname } = location;

  return (
    <footer className={styles.footerContainer}>
      <li style={{ backgroundColor: pathname === "/" ? "#9e9ea9" : "" }}>
        <Link to="/">
          <img className={styles.footerSvg} src="./home.svg" alt="home" />
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/create" ? "#9e9ea9" : "" }}>
        <Link to="/create">
          <img
            className={styles.footerSvg}
            src="./create.svg"
            alt="create post"
          />
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/search" ? "#9e9ea9" : "" }}>
        <Link to="/search">
          <img
            className={styles.footerSvg}
            src="./users.svg"
            alt="search for users"
          />
        </Link>
      </li>
      <li
        style={{ backgroundColor: pathname === "/messages" ? "#9e9ea9" : "" }}
      >
        <Link to="/messages">
          <img
            className={styles.footerSvg}
            src="./messages.svg"
            alt="messages"
          />
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/likes" ? "#9e9ea9" : "" }}>
        <Link to="/likes">
          <img
            className={styles.footerSvg}
            src="./likes.svg"
            alt="likes (posts)"
          />
        </Link>
      </li>
      <li
        style={{
          backgroundColor:
            pathname === `/profile/${userLogIn.id}` ? "#9e9ea9" : "",
        }}
      >
        <Link to={`/profile/${userLogIn.id}`}>
          <img
            className={styles.footerSvg}
            src="./profile.svg"
            alt="user profile"
          />
        </Link>
      </li>
      <li
        style={{ backgroundColor: pathname === "/settings" ? "#9e9ea9" : "" }}
      >
        <Link to="/settings">
          <img
            className={styles.footerSvg}
            src="./settings.svg"
            alt="settings"
          />
        </Link>
      </li>
    </footer>
  );
}
