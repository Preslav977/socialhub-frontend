import { App } from "../App";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SearchForUser } from "../components/SearchForUser/SearchForUser";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { Chats } from "../pages/Chats/Chats";
import { MainGridInterface } from "../pages/MainGrindInterface/MainGridInterface";
import { PostDetails } from "../pages/PostDetails/PostDetails";
import { Posts } from "../pages/Posts/Posts";
import { Settings } from "../pages/Settings/Settings";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoutes>
            <MainGridInterface
              pageProp={<Posts postsHeader={true} />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },

      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/login",
        element: <LogInForm />,
      },

      {
        path: "/create",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<CreatePost />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<Settings />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/search",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<SearchForUser />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<UserProfile />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/likes",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              pageProp={<Posts postsHeader={false} />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/following",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              pageProp={<Posts postsHeader={true} />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<PostDetails />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/messages",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<Chats />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
    ],
  },
];
