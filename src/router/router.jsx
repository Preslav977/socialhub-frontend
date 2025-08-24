import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { LatestAndMostFollowedUsers } from "../components/LatestAndMostFollowedUsers/LatestAndMostFollowedUsers";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SearchForUser } from "../components/SearchForUser/SearchForUser";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { MainGridInterface } from "../pages/MainGrindInterface/MainGridInterface";
import { Settings } from "../pages/Settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "",
    children: [
      {
        index: true,
        element: (
          <ProtectRoutes>
            <MainGridInterface
              middlePageProp={""}
              rightPageProp={<LatestAndMostFollowedUsers />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },

      { path: "/signup", element: <SignUpForm /> },
      { path: "/login", element: <LogInForm /> },

      {
        path: "/create",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              middlePageProp={<CreatePost />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              middlePageProp={<Settings />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/search",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              middlePageProp={<SearchForUser />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectRoutes>
            <MainGridInterface
              middlePageProp={<UserProfile />}
            ></MainGridInterface>
          </ProtectRoutes>
        ),
      },
    ],
  },
]);
