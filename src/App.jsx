import { useState } from "react";
import "./App.css";
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
  });

  return (
    <>
      <UserSignUpContext.Provider
        value={[userSignUp, setUserSignUp]}
      ></UserSignUpContext.Provider>
    </>
  );
}
