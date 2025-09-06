import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./AsideUlContent.module.css";

export function AsideUlContent() {
  const location = useLocation();

  const { pathname } = location;

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  return (
    <ul className={styles.asideUlContainer}>
      <li style={{ backgroundColor: pathname === "/" ? "#9e9ea9" : "" }}>
        <Link to="/">
          <img src="./home.svg" alt="home" />
          <span>Home</span>
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/create" ? "#9e9ea9" : "" }}>
        <Link to="/create">
          <img src="./create.svg" alt="create post" />
          <span>Create</span>
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/search" ? "#9e9ea9" : "" }}>
        <Link to="/search">
          <img src="./users.svg" alt="search for users" />
          <span>Users</span>
        </Link>
      </li>
      <li
        style={{ backgroundColor: pathname === "/messages" ? "#9e9ea9" : "" }}
      >
        <Link to="/messages">
          <img src="./messages.svg" alt="messages" />
          <span>Message</span>
        </Link>
      </li>
      <li style={{ backgroundColor: pathname === "/likes" ? "#9e9ea9" : "" }}>
        <Link to="/likes">
          <img src="./likes.svg" alt="likes (posts)" />
          <span>Likes</span>
        </Link>
      </li>
      <li
        style={{
          backgroundColor:
            pathname === `/profile/${userLogIn.id}` ? "#9e9ea9" : "",
        }}
      >
        <Link to={`/profile/${userLogIn.id}`}>
          <img src="./profile.svg" alt="user profile" />
          <span>Profile</span>
        </Link>
      </li>
      <li
        style={{ backgroundColor: pathname === "/settings" ? "#9e9ea9" : "" }}
      >
        <Link to="/settings">
          <img src="./settings.svg" alt="settings" />
          <span>Settings</span>
        </Link>
      </li>
    </ul>
  );
}
