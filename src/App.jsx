import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserLogInContext } from "./context/UserLogInContext";
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

  const [userLogIn, setUserLogIn] = useState();

  return (
    <>
      <UserLogInContext.Provider value={[userLogIn, setUserLogIn]}>
        <UserSignUpContext.Provider value={{ userSignUp, setUserSignUp }}>
          <Outlet />
        </UserSignUpContext.Provider>
      </UserLogInContext.Provider>
    </>
  );
}
