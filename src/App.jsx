import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserSignUpContext } from "./context/UserSignUpContext";

export function App() {
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    display_name: "",
    bio: "",
    website: "",
    github: "",
    profile_picture: "",
    password: "",
    confirm_password: "",
    followerNumber: 0,
    followingNumber: 0,
    posts: 0,
  });

  return (
    <main>
      <UserSignUpContext.Provider value={{ userSignUp, setUserSignUp }}>
        <Outlet />
      </UserSignUpContext.Provider>
    </main>
  );
}
