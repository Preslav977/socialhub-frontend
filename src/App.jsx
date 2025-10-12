import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EditUserProfileContext } from "./context/EditUserProfileContext";
import { HasNewCommentBeenCreatedContext } from "./context/HasNewCommentBeenCreatedContext";
import { HasNewCommentReplyBeenCreatedContext } from "./context/HasNewCommentReplyBeenCreatedContext";
import { HasNewPostBeenCreatedContext } from "./context/HasNewPostBeenCreatedContext";
import { PostsContext } from "./context/PostsContext";
import { UserDetailsContext } from "./context/UserDetailsContext";
import {
  UserIsLoggedInContext,
  UserLogInContext,
} from "./context/UserLogInContext";
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

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [userDetails, setUserDetails] = useState();

  const [editUserProfile, setEditUserProfile] = useState(false);

  const [posts, setPosts] = useState();

  const [hasNewPostBeenCreated, setHasNewPostBeenCreated] = useState(false);

  const [hasNewCommentBeenCreated, setHasNewCommentBeenCreated] =
    useState(false);

  const [hasNewCommentReplyBeenCreated, setHasNewCommentReplyBeenCreated] =
    useState(false);

  return (
    <>
      <HasNewCommentReplyBeenCreatedContext.Provider
        value={[
          hasNewCommentReplyBeenCreated,
          setHasNewCommentReplyBeenCreated,
        ]}
      >
        <HasNewCommentBeenCreatedContext.Provider
          value={[hasNewCommentBeenCreated, setHasNewCommentBeenCreated]}
        >
          <HasNewPostBeenCreatedContext.Provider
            value={[hasNewPostBeenCreated, setHasNewPostBeenCreated]}
          >
            <PostsContext.Provider value={[posts, setPosts]}>
              <EditUserProfileContext.Provider
                value={[editUserProfile, setEditUserProfile]}
              >
                <UserDetailsContext.Provider
                  value={[userDetails, setUserDetails]}
                >
                  <UserIsLoggedInContext.Provider
                    value={[isUserLoggedIn, setIsUserLoggedIn]}
                  >
                    <UserLogInContext.Provider
                      value={[userLogIn, setUserLogIn]}
                    >
                      <UserSignUpContext.Provider
                        value={{ userSignUp, setUserSignUp }}
                      >
                        <Outlet />
                      </UserSignUpContext.Provider>
                    </UserLogInContext.Provider>
                  </UserIsLoggedInContext.Provider>
                </UserDetailsContext.Provider>
              </EditUserProfileContext.Provider>
            </PostsContext.Provider>
          </HasNewPostBeenCreatedContext.Provider>
        </HasNewCommentBeenCreatedContext.Provider>
      </HasNewCommentReplyBeenCreatedContext.Provider>
    </>
  );
}
