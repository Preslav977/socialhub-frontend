import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AsideUlContent.module.css";

export function AsideUlContent() {
  const [visitedLink, setVisitedLink] = useState("/home");

  return (
    <ul className={styles.asideUlContainer}>
      <li
        onClick={() => setVisitedLink("/home")}
        style={{ backgroundColor: visitedLink === "/home" ? "gray" : "" }}
      >
        <Link to="/home">
          <img src="./home.svg" alt="home" />
          <span>Home</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/create")}
        style={{ backgroundColor: visitedLink === "/create" ? "gray" : "" }}
      >
        <Link to="/create">
          <img src="./create.svg" alt="create" />
          <span>Create</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/users")}
        style={{ backgroundColor: visitedLink === "/users" ? "gray" : "" }}
      >
        <Link to="/search">
          <img src="./users.svg" alt="search for users" />
          <span>Users</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/messages")}
        style={{ backgroundColor: visitedLink === "/messages" ? "gray" : "" }}
      >
        <Link to="/messages">
          <img src="./messages.svg" alt="messages" />
          <span>Message</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/likes")}
        style={{ backgroundColor: visitedLink === "/likes" ? "gray" : "" }}
      >
        <Link to="/likes">
          <img src="./likes.svg" alt="likes" />
          <span>Likes</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/profile")}
        style={{ backgroundColor: visitedLink === "/profile" ? "gray" : "" }}
      >
        <Link to="/profile">
          <img src="./profile.svg" alt="profile" />
          <span>Profile</span>
        </Link>
      </li>
      <li
        onClick={() => setVisitedLink("/settings")}
        style={{ backgroundColor: visitedLink === "/settings" ? "gray" : "" }}
      >
        <Link to="/settings">
          <img src="./settings.svg" alt="settings" />
          <span>Settings</span>
        </Link>
      </li>
    </ul>
  );
}
