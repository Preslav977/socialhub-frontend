import { App } from "../App";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectApp } from "../components/ProtectApp/ProtectApp";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SearchForUser } from "../components/SearchForUser/SearchForUser";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { MainGridInterface } from "../pages/MainGrindInterface/MainGridInterface";
import { Settings } from "../pages/Settings/Settings";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectApp path={"/"}>
        <App />
      </ProtectApp>
    ),
    children: [
      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/login",
        element: <LogInForm />,
      },
      {
        path: "/home",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={""}></MainGridInterface>
          </ProtectRoutes>
        ),
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
    ],
  },
];
