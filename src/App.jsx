import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EditUserProfileContext } from "./context/EditUserProfileContext";
import { PostsContext } from "./context/PostsContext";
import { RecentOrFollowingPostsContext } from "./context/RecentOrFollowingPostsContext";
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

  const [recentOrFollowingPosts, setRecentOrFollowingPosts] =
    useState("recent");

  return (
    <>
      <RecentOrFollowingPostsContext.Provider
        value={[recentOrFollowingPosts, setRecentOrFollowingPosts]}
      >
        <PostsContext.Provider value={[posts, setPosts]}>
          <EditUserProfileContext.Provider
            value={[editUserProfile, setEditUserProfile]}
          >
            <UserDetailsContext.Provider value={[userDetails, setUserDetails]}>
              <UserIsLoggedInContext.Provider
                value={[isUserLoggedIn, setIsUserLoggedIn]}
              >
                <UserLogInContext.Provider value={[userLogIn, setUserLogIn]}>
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
      </RecentOrFollowingPostsContext.Provider>
    </>
  );
}
